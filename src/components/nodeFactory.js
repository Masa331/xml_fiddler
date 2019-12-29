import React from 'react';
import SubNode from './SubNode.js';
import TextNode from './TextNode.js';
import EmptyTag from './EmptyTag.js';

function isEndNode(node) {
  const result = (node.elements) && (node.elements.length === 1) && (node.elements[0].type === "text" || node.elements[0].type === "cdata");

  return result;
}

function nodeFactory(element, index) {
  const isEmptyNode = (!element.elements) || (element.elements.length === 0);

  if(isEmptyNode) {
    return (
      [<EmptyTag key={index} name={element.name} attributes={element.attributes} />]
    );
  } else if(isEndNode(element)) {
    return (
      [<TextNode key={index} name={element.name} text={element.elements[0].text} cdata={element.elements[0].cdata} />]
    );
  } else {
    const componentRef = React.createRef();

    return (
      [<SubNode
        key={index}
        name={element.name}
        elements={element.elements}
        attributes={element.attributes}
        ref={componentRef}
      />, componentRef]
    );
  }
}

export default nodeFactory;
