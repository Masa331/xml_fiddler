import React, { Component } from 'react';
import OpenTag from './OpenTag.js';
import CloseTag from './CloseTag.js';
import TextNode from './TextNode.js';
import EmptyTag from './EmptyTag.js';

class Node extends Component {
  constructor(props) {
    super(props);

    this.containsOnlyText = this.containsOnlyText.bind(this);
    this.isEmpty = this.isEmpty.bind(this);
    this.hasMembers = this.hasMembers.bind(this);

    this.collapse = this.collapse.bind(this);
    this.expand = this.expand.bind(this);
    this.collapseSubNodes = this.collapseSubNodes.bind(this);
    this.expandSubNodes = this.expandSubNodes.bind(this);
  }

  state = {};
  childRefs = [];

  collapse() {
    this.setState({ collapsed: true });

    if (this.textRef) {
      this.textRef.current.collapse();
    }
  };

  expand() {
    this.setState({ collapsed: false });

    if (this.textRef) {
      this.textRef.current.expand();
    }
  };

  collapseSubNodes() {
    this.childRefs.forEach((ref) => {
      ref.current.collapse();
    });

  };

  expandSubNodes() {
    this.childRefs.forEach((ref) => {
      ref.current.expand();
    });
  };

  render() {
    if(this.isEmpty(this.props.elements)) {
      return <EmptyTag { ...this.props } />;
    } else if(this.containsOnlyText(this.props.elements)) {
      const componentRef = React.createRef();
      this.textRef = componentRef;
      return <TextNode ref={componentRef} { ...this.props } />;
    } else {
      let newRefs = [];
      let subNodes = this.props.elements.map((element, index) => {
        const componentRef = React.createRef();
        newRefs.push(componentRef);

        return <Node
          key={index}
          name={element.name}
          elements={element.elements}
          attributes={element.attributes}
          ref={componentRef}
        />;
      });
      this.childRefs = newRefs;

      let collapsedClass;
      if(this.state.collapsed) {
        collapsedClass = 'collapsed';
      } else {
        collapsedClass = 'expanded';
      }
      const nodeClasses = `node ${collapsedClass}`;

      const functions = [
        ["+", this.expand, 'hide-in-expanded'],
        ["-", this.collapse, 'hide-in-collapsed'],
        ["++", this.expandSubNodes, 'hide-in-collapsed'],
        ["--", this.collapseSubNodes, 'hide-in-collapsed']
      ];

      return (
        <div className={nodeClasses}>
          <div className={collapsedClass}><OpenTag name={this.props.name} attributes={this.props.attributes} functions={functions} /></div>
          <div className="sub-nodes hide-in-collapsed">
            { subNodes }
          </div>
          <div className="hide-in-collapsed"><CloseTag name={this.props.name} /></div>
        </div>
      );
    }
  }

  // private

  containsOnlyText(nodes) {
    return nodes.every((node) => {
      return node.type === 'text' || node.type === 'cdata';
    });
  }

  isEmpty(array) {
    return !this.hasMembers(array);
  }

  hasMembers(array) {
    return Array.isArray(array) && array.length;
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (this.state.collapsed !== nextState.collapsed);
  }
}

export default Node;
