import React from 'react';

function OpenTag(props) {
  let attrs = [];
  for (let attr in props.attributes) {
    const formatted = <span> <span className="attribute-name">{attr}</span>="<span className="attribute-value">{props.attributes[attr]}</span>"</span>;

    attrs.push(formatted);
  }

  return (
    <span className="tag">&lt;{props.name}{attrs}></span>
  );
}

export default React.memo(OpenTag);
