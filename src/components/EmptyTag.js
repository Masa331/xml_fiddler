import React from 'react';
import Attribute from './Attribute.js';
import NodeControl from './NodeControl.js';
import { copyToClipboard } from './utils.js';

function EmptyTag(props) {
  const attrs = Object.entries(props.attributes || {}).map(([key, value], index) => {
    return <Attribute key={index} name={key} value={value}/>;
  });

  const copyXpath = () => {
    copyToClipboard(props.xpath);
  }

  const functions = [
    ["xpath", copyXpath, '', props.xpath + ' - click to copy']
  ]

  const controls = functions.map(([label, handler, classes, title], index) => {
    return(
      <NodeControl key={index} classes={classes} handler={handler} label={label} title={title} />
    );
  });

  return (
    <div>
      <span className="tag">&lt;{props.name}{attrs}/></span>
      { controls }
    </div>
  );
}

export default React.memo(EmptyTag);
