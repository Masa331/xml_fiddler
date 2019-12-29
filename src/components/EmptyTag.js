import React from 'react';

function EmptyTag(props) {
  return (
    <span>{'<'}<span className="end-tag">{props.name}</span>{'/>'}</span>
  );
}

export default EmptyTag;
