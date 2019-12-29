import React from 'react';

function Declaration(props) {
  var attrs = [];
  for (var attr in props.attributes) {
    if (props.attributes.hasOwnProperty(attr)) {
      attrs.push(`${attr}="${props.attributes[attr]}"`)
    }
  }

  return (
    <span>
      {'<?xml'} {attrs.join(' ')} {'?>'}
    </span>
  );
}

export default Declaration;
