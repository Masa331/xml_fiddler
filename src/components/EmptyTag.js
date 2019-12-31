import React from 'react';
import Attribute from './Attribute.js';

function EmptyTag(props) {
  const attrs = Object.entries(props.attributes || {}).map(([key, value], index) => {
    return <Attribute key={index} name={key} value={value}/>;
  });

  return (
    <div>
    <span className="tag">&lt;{props.name}{attrs}/></span>
    </div>
  );
}

export default React.memo(EmptyTag);
