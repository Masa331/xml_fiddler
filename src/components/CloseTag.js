import React from 'react';

function CloseTag(props) {
  return (
    <span>{'</'}<span className="end-tag">{props.name}</span>{'>'}</span>
  );
}

export default CloseTag;
