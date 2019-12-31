import React from 'react';

function Attribute(props) {
  return (
    <span> <span className="attribute-name">{props.name}</span>="<span className="attribute-value">{props.value}</span>"</span>
  );
}

export default React.memo(Attribute);
