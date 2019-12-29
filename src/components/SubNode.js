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
  state = {};
  childRefs = [];

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

  shouldComponentUpdate(nextProps, nextState) {
    return (this.state.collapsed !== nextState.collapsed);
  }

  render() {
    let functions = [];
    let classes = 'sub-level';

    let newRefs = [];
    let subNodes = this.props.elements.map((element, index) => {
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

      const collapsibleSubElements = hasCollapsibleSubElements(this.props.elements);
      if (collapsibleSubElements) {
        functions.push(["++", this.recursiveExpand]);
        functions.push(["--", this.recursiveCollapse]);
      }
    }

    let controls = functions.map((func, index) => {
      const label = func[0];
      const handler = func[1];

      return(
        <button key={index} className="node-control" onClick={handler}>{label}</button>
      );
    });

    return (
      <div className={classes}>
        <span>
          <OpenTag name={this.props.name} attributes={this.props.attributes} />
          { controls }
        </span>
        <div className="sub-nodes">
          { subNodes }
        </div>
        <CloseTag name={this.props.name} />
      </div>
    );
  }
}

export default SubNode;
