import React, { Component } from 'react';
import OpenTag from './OpenTag.js';
import CloseTag from './CloseTag.js';
import NodeControl from './NodeControl.js';
import { copyToClipboard } from './utils.js';

class TextNode extends Component {
  constructor(props) {
    super(props);

    this.collapse = this.collapse.bind(this);
    this.expand = this.expand.bind(this);
    this.copyXpath = this.copyXpath.bind(this);
  }

  state = {};

  collapse() {
    this.setState({ collapsed: true });
  };

  expand() {
    this.setState({ collapsed: false });
  };

  copyXpath() {
    copyToClipboard(this.props.xpath);
  };

  render() {
    let value;
    if (this.props.elements[0].text) {
      value = this.props.elements[0].text;
    } else if(this.props.elements[0].cdata) {
      value = `<![CDATA[${this.props.elements[0].cdata}]]>`
    }

    let collapsedClass;
    if(this.state.collapsed) {
      collapsedClass = 'collapsed';
    } else {
      collapsedClass = 'expanded';
    }
    const nodeClasses = `node ${collapsedClass}`;

    const functions = [
      ["+", this.expand, 'hide-in-expanded', 'expand node'],
      ["-", this.collapse, 'hide-in-collapsed', 'collapse node'],
      ["xpath", this.copyXpath, '', this.props.xpath + ' - click to copy']
    ]

    const controls = functions.map(([label, handler, classes, title], index) => {
      return(
        <NodeControl key={index} classes={classes} handler={handler} label={label} title={title} />
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
