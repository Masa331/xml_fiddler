import React from 'react';

function EmptyTag(props) {
  let attrs = [];
  for (let attr in props.attributes) {
    const formatted = <span> <span className="attribute-name">{attr}</span>="<span className="attribute-value">{props.attributes[attr]}</span>"</span>;

    attrs.push(formatted);
  }

  return (
    <div>
    <span className="tag">&lt;{props.name}{attrs}/></span>
    </div>
  );
}

export default React.memo(EmptyTag);
