import React from 'react';

function CloseTag(props) {
  const collapsedControls = (props.collapsedFunctions || []).map((func, index) => {
    const label = func[0];
    const handler = func[1];

    return(
      <button key={index} className="node-control hide-in-expanded" onClick={handler}>{label}</button>
    );
  });

  const expandedControls = (props.expandedFunctions || []).map((func, index) => {
    const label = func[0];
    const handler = func[1];

    return(
      <button key={index} className="node-control hide-in-collapsed" onClick={handler}>{label}</button>
    );
  });

  return (
    <React.Fragment>
      <span className="tag">&lt;/{props.name}></span>
      { collapsedControls }
      { expandedControls }
    </React.Fragment>
  );
}

export default React.memo(CloseTag);
