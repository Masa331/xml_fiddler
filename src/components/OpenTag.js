import React from 'react';

function OpenTag(props) {
  let controls = (props.functions || []).map((func, index) => {
    const label = func[0];
    const handler = func[1];

    return(
      <span key={index} className="node-control" onClick={handler}>{label}</span>
    );
  });

  return (
    <span>
      <span>{'<'}<span className="start-tag">{props.name}</span>{'>'}</span>
      { controls }
    </span>
  );
}

export default OpenTag;
