import React, { Component } from 'react';
import OpenTag from './OpenTag.js';
import CloseTag from './CloseTag.js';
import EmptyNode from './EmptyNode.js';
import EndNode from './EndNode.js';

import nodeFactory from './nodeFactory.js';

function repeat(str, times) {
  return (new Array(times + 1)).join(str);
};

function coll(objs = []) {
  let result = objs.map((obj) => {
    obj.collapsed = true;
    obj.elements = coll(obj.elements);
    return obj;
  })
  return result;
}

function exp(objs = []) {
  let result = objs.map((obj) => {
    obj.collapsed = false;
    obj.elements = exp(obj.elements);
    return obj;
  })
  return result;
}

class SubNode extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.name,
      indentation: this.props.indentation,
      elements: this.props.elements || [],
      collapsed: this.props.collapsed
    };
  }

  spaces() {
    return <span dangerouslySetInnerHTML={{ __html: repeat("&nbsp;", this.props.indentation) }} />
  }

  collapse = () => {
    this.setState({ collapsed: true });
  };

  expand = () => {
    this.setState({ collapsed: false });
  };

  collapseChildren = () => {
    this.setState({ elements: coll(this.state.elements) });
  };

  expandChildren = () => {
    this.setState({ elements: exp(this.state.elements) });
  };

  render() {
    let content;
    let functions = [];
    let closeTag;

    let subNodes = this.state.elements.map((element, index) => {
      return nodeFactory(element, this.state.indentation + 2, index);
    })

    if(this.state.collapsed) {
      content = <br/>;
      functions.push(["+", this.expand]);
    } else { // Expanded
      content =
        <React.Fragment>
          <br />
          { subNodes }
          {this.spaces()}
        </React.Fragment>;
      functions.push(["-", this.collapse]);
      functions.push(["++", this.expandChildren]);
      functions.push(["--", this.collapseChildren]);
      closeTag = <CloseTag name={this.props.name} />;
    }

    return (
      <div>
        {this.spaces()}
        <OpenTag
          name={this.props.name}
          functions = { functions }
        />
        { content }
        { closeTag }
      </div>
    );
  }
}

export default SubNode;
