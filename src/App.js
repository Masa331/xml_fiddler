import React, { Component } from 'react';
import './App.css';
const convert = require('xml-js');


const xml = "<?xml version='1.0' encoding='utf-8'?>\
<note importance='high'>\
  <empty/>\
  <title>Look Ma!</title>\
  <todo>ol sok</todo>\
  <todo>woooooof Basset barks!</todo>\
  <details>\
    <param>neco</param>\
  </details>\
</note>"

const json = convert.xml2json(xml, { compact: false });
const parsed = JSON.parse(json);

String.prototype.repeat = function(times) {
  return (new Array(times + 1)).join(this);
};

class OpenTag extends Component {
  constructor(props) {
    super(props);

    this.state = { name: 'tag', attributes: [] };
  }

  render() {
    let controls;

    if (this.props.collapse) {
      controls =
        <React.Fragment>
          <span className="node-control" onClick={this.props.expand}>+</span>
          &nbsp;
          <span className="node-control" onClick={this.props.collapse}>-</span>
          &nbsp;
          <span className="node-control" onClick={this.props.expandAll}>++</span>
          &nbsp;
          <span className="node-control" onClick={this.props.collapseAll}>--</span>
        </React.Fragment>
    } else {
      controls = <span></span>
    }

    return (
      <React.Fragment>
        <span>{'<' + this.props.name + '>'}</span>
        { controls }
      </React.Fragment>
    );
  }
}

class CloseTag extends Component {
  constructor(props) {
    super(props);

    this.state = { name: 'tag' };
  }

  render() {
    return (
      <span>{'</' + this.props.name + '>'}</span>
    );
  }
}

class EmptyTag extends Component {
  constructor(props) {
    super(props);

    this.state = { name: 'tag' };
  }

  render() {
    return (
      <span>{'<' + this.props.name + ' />'}</span>
    );
  }
}

class EmptyNode extends Component {
  constructor(props) {
    super(props);

    this.state = { name: '', indentation: 0 };
  }

  spaces() {
    return <span dangerouslySetInnerHTML={{ __html: "&nbsp;".repeat(this.props.indentation) }} />
  }

  render() {
    return (
      <React.Fragment>
        {this.spaces()}
        <EmptyTag name={this.props.name} />
      </React.Fragment>
    );
  }
}

class SubNode extends Component {
  constructor(props) {
    super(props);

    // jak to udelat, abych nemusel mit collapse a collapseAll ale jen collapse a nejakym zpsuobem rekurzivne nad vsema childrens
    //   zavolal rerender s collapse  = true aby se skryly???
    this.state = {
      name: '',
      indentation: 0,
      elements: [],
      collapsed: false
      collapsedAll: false
    };
  }

  spaces() {
    return <span dangerouslySetInnerHTML={{ __html: "&nbsp;".repeat(this.props.indentation) }} />
  }

  collapse = () => {
    this.setState({ collapsed: true });
  };

  expand = () => {
    this.setState({ collapsed: false });
  };

  render() {
    let content;

    if(this.state.collapsed) {
      content = <br/>
    } else {
      content =
        <React.Fragment>
          <br />
          { this.props.elements.map((element, index) => (
            <XmlNode key={index} indentation={this.props.indentation + 2} {...element} />
          ))}
          {this.spaces()}
        </React.Fragment>
    }

    return (
      <div>
        {this.spaces()}
        <OpenTag name={this.props.name} collapse={this.collapse} expand={this.expand} />
        { content }
        <CloseTag name={this.props.name} />
      </div>
    );
  }
}

class EndNode extends Component {
  constructor(props) {
    super(props);

    this.state = { name: '', text: '', indentation: 0 };
  }

  spaces() {
    return <span dangerouslySetInnerHTML={{ __html: "&nbsp;".repeat(this.props.indentation) }} />
  }

  render() {
    return (
      <div>
        {this.spaces()}
        <OpenTag name={this.props.name}/>
        {this.props.text}
        <CloseTag name={this.props.name} />
      </div>
    );
  }
}

const node = (element, indentation, index) => {
  return <XmlNode key={index} indentation={0} {...element} />;

  var isEmptyNode = (!this.props.elements);
  var isEndNode = (this.props.elements) && (this.props.elements.length === 1) && this.props.elements[0].type === "text";
}

class XmlNode extends Component {
  constructor(props) {
    super(props);

    this.state = { type: 'text', text: '', indentation: 0 };
  }

  spaces() {
    return <span dangerouslySetInnerHTML={{ __html: "&nbsp;".repeat(this.props.indentation) }} />
  }

  render() {
    var isEmptyNode = (!this.props.elements);
    var isEndNode = (this.props.elements) && (this.props.elements.length === 1) && this.props.elements[0].type === "text";

    if(isEmptyNode) {
      return (
        <EmptyNode name={this.props.name} indentation={this.props.indentation} />
      );
    } else if(isEndNode) {
      return (
        <EndNode name={this.props.name} indentation={this.props.indentation} text={this.props.elements[0].text} />
      );
    } else {
      return (
        <SubNode
          name={this.props.name}
          indentation={this.props.indentation}
          elements={this.props.elements} />
      );
    }
  }
}

const Declaration = (props) => {
  var attrs = [];
  for (var attr in props.attributes) {
    if (props.attributes.hasOwnProperty(attr)) {
      attrs.push(`${attr}="${props.attributes[attr]}"`)
    }
  }

  return (
    <span>
      {'<?xml'} {attrs.join(' ')} {'?>'}
    </span>
  );
}

class App extends Component {
  render() {
    return (
      <div>
        <Declaration {...parsed.declaration} />

        { parsed.elements.map((element, index) => (
          node(element, 0, index)
        ))}
      </div>
    );
  }
}

export default App;
