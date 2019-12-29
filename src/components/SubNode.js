import React, { Component } from 'react';
import OpenTag from './OpenTag.js';
import CloseTag from './CloseTag.js';

import nodeFactory from './nodeFactory.js';

function repeat(str, times) {
  return (new Array(times + 1)).join(str);
};

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
      indentation: this.props.indentation,
      elements: this.props.elements || [],
      collapsed: this.props.collapsed
    };

    this.childRefs = [];
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
    let closeTag;
    let classes = '';

    let newRefs = [];
    let subNodes = this.state.elements.map((element, index) => {
      const [component, ref] = nodeFactory(element, this.state.indentation + 2, index);
      if (ref) {
        newRefs.push(ref);
      };
      return component;
    })
    this.childRefs = newRefs;

    if(this.state.collapsed) {
      functions.push(["+", this.expand]);
      classes = 'display-none';
    } else { // Expanded
      functions.push(["-", this.collapse]);

      const collapsibleSubElements = hasCollapsibleSubElements(this.state.elements);
      if (collapsibleSubElements) {
        functions.push(["++", this.recursiveExpand]);
        functions.push(["--", this.recursiveCollapse]);
      }

      closeTag =
        <React.Fragment>
          { this.spaces() }
          <CloseTag name={this.props.name} />
        </React.Fragment>;
    }

    return (
      <div>
        {this.spaces()}
        <OpenTag
          name={this.props.name}
          functions = { functions }
        />
        <div className={ classes }>
          { subNodes }
        </div>
        { closeTag }
      </div>
    );
  }
}

export default SubNode;
