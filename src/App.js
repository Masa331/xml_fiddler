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
      return(
        <span>{this.spaces()}{'<'}{this.props.name}{' />'}</span>
      );
    } else if(isEndNode) {
      return(
        <div>
          {this.spaces()}
          <span>{'<'}{this.props.name}{'>'}</span>
          <span>{this.props.elements[0].text}</span>
          <span>{'</'}{this.props.name}{'>'}</span>
      </div>
      );
    } else {
      return(
        <div>
          <span>{this.spaces()}{'<'}{this.props.name}{'>'}</span>
          <br />
          { this.props.elements.map((element, index) => {
            return <XmlNode key={index} indentation={this.props.indentation + 2} {...element} />
          })}
          <span>{this.spaces()}{'</'}{this.props.name}{'>'}</span>
      </div>
      );
    }

    if(this.props.type === "text") {
    } else {
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

  return(
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

        <div>
          { parsed.elements.map((element, index) => {
            return <XmlNode key={index} indentation={0} {...element} />
          })}
        </div>
      </div>
    );
  }
}

export default App;
