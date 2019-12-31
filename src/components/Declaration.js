import React from 'react';
import Attribute from './Attribute.js';

function Declaration(props) {
  const attrs = Object.entries(props.attributes || {}).map(([key, value], index) => {
    return <Attribute key={index} name={key} value={value}/>;
  });

  return (
    <span>{'<?xml'} {attrs} {'?>'}</span>
  );
}

export default React.memo(Declaration);
