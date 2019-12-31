import React from 'react';
import Attribute from './Attribute.js';

function OpenTag(props) {
  const attrs = Object.entries(props.attributes || {}).map(([key, value], index) => {
    return <Attribute key={index} name={key} value={value}/>;
  });

  return (
    <span className="tag">&lt;{props.name}{attrs}></span>
  );
}

export default React.memo(OpenTag);
