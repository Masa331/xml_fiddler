import React from 'react';
import OpenTag from './OpenTag.js';
import CloseTag from './CloseTag.js';

function TextNode(props) {
  const value = props.text || props.cdata;

  return (
    <div className="sub-level">
      <OpenTag name={props.name}/>
      {value}
      <CloseTag name={props.name} />
    </div>
  );
}

export default React.memo(TextNode);
