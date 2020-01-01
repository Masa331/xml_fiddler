import React, { Component } from 'react';
import OpenTag from './OpenTag.js';
import CloseTag from './CloseTag.js';
import TextNode from './TextNode.js';
import EmptyTag from './EmptyTag.js';

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

class Node extends Component {
  constructor(props) {
    super(props);

    this.isEndNode = this.isEndNode.bind(this);
  }

  state = {};
  childRefs = [];

  collapse = () => {
    this.setState({ collapsed: true });
  };

  expand = () => {
    this.setState({ collapsed: false });
  };

  collapseSubNodes = () => {
    this.childRefs.forEach((ref) => {
      ref.current.collapse();
    });
  };

  expandSubNodes = () => {
    this.childRefs.forEach((ref) => {
      ref.current.expand();
    });
  };

  // shouldComponentUpdate(nextProps, nextState) {
  //   return (this.state.collapsed !== nextState.collapsed);
  // }

  render() {
    const isEmptyNode = (!this.props.elements) || (this.props.elements.length === 0);

    if(isEmptyNode) {
      return <EmptyTag { ...this.props } />;
    } else if(this.isEndNode(this.props)) {
      return ( <TextNode { ...this.props } />);
    } else {
      let functions = [];
      let classes = 'sub-level';

      let newRefs = [];
      let subNodes = this.props.elements.map((element, index) => {
        const componentRef = React.createRef();
        newRefs.push(componentRef);

        const component = <Node
          key={index}
          name={element.name}
          elements={element.elements}
          attributes={element.attributes}
          ref={componentRef}
        />

        return component;
      });
      this.childRefs = newRefs;

      if(this.state.collapsed) {
        functions.push(["+", this.expand]);
        classes += ' hide-children';
      } else { // Expanded
        functions.push(["-", this.collapse]);

        const collapsibleSubElements = hasCollapsibleSubElements(this.props.elements);
        if (collapsibleSubElements) {
          functions.push(["++", this.expandSubNodes]);
          functions.push(["--", this.collapseSubNodes]);
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

  // private

  isEndNode(node) {
    const result = (node.elements) && (node.elements.length === 1) && (node.elements[0].type === "text" || node.elements[0].type === "cdata");

    return result;
  }
}

export default Node;
