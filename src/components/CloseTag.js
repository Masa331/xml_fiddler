import React from 'react';

function CloseTag(props) {
  return (
    <span className="tag">&lt;/{props.name}></span>
  );
}

export default React.memo(CloseTag);
