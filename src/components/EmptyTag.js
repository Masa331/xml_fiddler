import React from 'react';

function EmptyTag(props) {
  return (
    <span className="tag">&lt;{props.name}/></span>
  );
}

export default React.memo(EmptyTag);
