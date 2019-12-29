import React from 'react';
import OpenTag from './OpenTag.js';
import CloseTag from './CloseTag.js';

function EndNode(props) {
  return (
    <div className="sub-level">
      <OpenTag name={props.name}/>
      {props.text}
      <CloseTag name={props.name} />
    </div>
  );
}

export default EndNode;
