import React from 'react';

function NodeControl(props) {
  const classes = `node-control ${props.classes}`;
  return(
    <button className={classes} onClick={props.handler} title={props.title}>{props.label}</button>
  );
}

export default React.memo(NodeControl);
