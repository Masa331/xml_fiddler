import React from 'react';
import EmptyNode from './EmptyNode.js';
import SubNode from './SubNode.js';
import EndNode from './EndNode.js';

const nodeFactory = (element, indentation, index) => {
  var isEmptyNode = (!element.elements) || (element.elements.length === 0);
  var isEndNode = (element.elements) && (element.elements.length === 1) && element.elements[0].type === "text";

  if(isEmptyNode) {
    return (
      [<EmptyNode key={index} name={element.name} indentation={indentation} />]
    );
  } else if(isEndNode) {
    return (
      [<EndNode key={index} name={element.name} indentation={indentation} text={element.elements[0].text} />]
    );
  } else {
    const componentRef = React.createRef();

    return (
      [<SubNode
        key={index}
        name={element.name}
        indentation={indentation}
        elements={element.elements}
        collapsed={element.collapsed}
        ref={componentRef}
      />, componentRef]
    );
  }
}

export default nodeFactory;
