import React, { Component } from 'react';
import OpenTag from './OpenTag.js';
import CloseTag from './CloseTag.js';
import NodeControl from './NodeControl.js';
import { copyToClipboard, extractText } from './utils.js';

class TextNode extends Component {
  constructor(props) {
    super(props);

    this.collapse = this.collapse.bind(this);
    this.expand = this.expand.bind(this);
    this.copyXpath = this.copyXpath.bind(this);
    this.group = this.group.bind(this);
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

  group() {
    this.props.groupFunc(this.props.xpath);
  };

  render() {
    const value = extractText(this.props);

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
      ["xpath", this.copyXpath, '', this.props.xpath + ' - click to copy'],
      ["group", this.group, '', 'group']
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
