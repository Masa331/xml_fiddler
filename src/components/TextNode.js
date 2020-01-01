import React from 'react';
import OpenTag from './OpenTag.js';
import CloseTag from './CloseTag.js';

function TextNode(props) {
  const value = props.elements[0].text || props.elements[0].cdata;

  return (
    <div className="sub-level">
      <OpenTag name={props.name} attributes={props.attributes}/>
      {value}
      <CloseTag name={props.name} />
    </div>
  );
}

export default React.memo(TextNode);
