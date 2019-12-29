import React from 'react';
import SubNode from './SubNode.js';
import EndNode from './EndNode.js';
import EmptyTag from './EmptyTag.js';

const nodeFactory = (element, index) => {
  var isEmptyNode = (!element.elements) || (element.elements.length === 0);
  var isEndNode = (element.elements) && (element.elements.length === 1) && element.elements[0].type === "text";

  if(isEmptyNode) {
    return (
      [<EmptyTag key={index} name={element.name} />]
    );
  } else if(isEndNode) {
    return (
      [<EndNode key={index} name={element.name} text={element.elements[0].text} />]
    );
  } else {
    const componentRef = React.createRef();

    return (
      [<SubNode
        key={index}
        name={element.name}
        elements={element.elements}
        ref={componentRef}
      />, componentRef]
    );
  }
}

export default nodeFactory;
