import React, { Component } from 'react';
import OpenTag from './OpenTag.js';
import CloseTag from './CloseTag.js';

import nodeFactory from './nodeFactory.js';

function hasCollapsibleSubElements(elements = []) {
  let result;

  elements.forEach((element) => {
    if (element.elements) {
    element.elements.forEach((element2) => {
      if (element2.elements && element2.elements.length > 0) {
        result = true;
      }
    });
    };
  });

  return result;
}

class SubNode extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.name,
      elements: this.props.elements || [],
      collapsed: this.props.collapsed
    };

    this.childRefs = [];
  }

  collapse = () => {
    this.setState({ collapsed: true });
  };

  expand = () => {
    this.setState({ collapsed: false });
  };

  recursiveCollapse = () => {
    this.childRefs.forEach((ref) => {
      ref.current.collapse();
      ref.current.recursiveCollapse();
    });
  };

  recursiveExpand = () => {
    this.childRefs.forEach((ref) => {
      ref.current.expand();
      ref.current.recursiveExpand();
    });
  };

  render() {
    let functions = [];
    let classes = 'sub-level';

    let newRefs = [];
    let subNodes = this.state.elements.map((element, index) => {
      const [component, ref] = nodeFactory(element, index);
      if (ref) {
        newRefs.push(ref);
      };
      return component;
    })
    this.childRefs = newRefs;

    if(this.state.collapsed) {
      functions.push(["+", this.expand]);
      classes += ' hide-children';
    } else { // Expanded
      functions.push(["-", this.collapse]);

      const collapsibleSubElements = hasCollapsibleSubElements(this.state.elements);
      if (collapsibleSubElements) {
        functions.push(["++", this.recursiveExpand]);
        functions.push(["--", this.recursiveCollapse]);
      }
    }

    return (
      <div className={classes}>
        <OpenTag name={this.props.name} functions = { functions } />
        { subNodes }
        <CloseTag name={this.props.name} />
      </div>
    );
  }
}

export default SubNode;
