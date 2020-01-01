import React, { Component } from 'react';
import OpenTag from './OpenTag.js';
import CloseTag from './CloseTag.js';
import NodeControl from './NodeControl.js';

class TextNode extends Component {
  constructor(props) {
    super(props);

    this.collapse = this.collapse.bind(this);
    this.expand = this.expand.bind(this);
  }

  state = {};

  collapse() {
    this.setState({ collapsed: true });
  };

  expand() {
    this.setState({ collapsed: false });
  };

  render() {
    const value = this.props.elements[0].text || this.props.elements[0].cdata;

    let collapsedClass;
    if(this.state.collapsed) {
      collapsedClass = 'collapsed';
    } else {
      collapsedClass = 'expanded';
    }
    const nodeClasses = `node ${collapsedClass}`;

    const functions = [
      ["+", this.expand, 'hide-in-expanded'],
      ["-", this.collapse, 'hide-in-collapsed']
    ]

    const controls = functions.map(([label, handler, classes], index) => {
      return(
        <NodeControl key={index} classes={classes} handler={handler} label={label} />
      );
    });

    return (
      <div className={nodeClasses}>
        <OpenTag name={this.props.name} attributes={this.props.attributes} />
        <span className="hide-in-collapsed">{value}</span>
        <span className="hide-in-collapsed"><CloseTag name={this.props.name} /></span>
        { controls }
      </div>
    );
  }
}

export default TextNode;
