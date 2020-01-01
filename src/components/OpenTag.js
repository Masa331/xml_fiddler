import React from 'react';
import Attribute from './Attribute.js';
import NodeControl from './NodeControl.js';

function OpenTag(props) {
  const attrs = Object.entries(props.attributes || {}).map(([key, value], index) => {
    return <Attribute key={index} name={key} value={value}/>;
  });

  const controls = (props.functions || []).map(([label, handler, classes], index) => {
    return(
      <NodeControl key={index} classes={classes} handler={handler} label={label} />
    );
  });

  return (
    <React.Fragment>
      <span className="tag">&lt;{props.name}{attrs}></span>
      { controls }
    </React.Fragment>
  );
}

export default React.memo(OpenTag);
