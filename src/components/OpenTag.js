import React from 'react';

function OpenTag(props) {
  return (
    <span className="tag">&lt;{props.name}></span>
  );
}

export default React.memo(OpenTag);
