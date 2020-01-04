import React from 'react';
import NodeControl from './NodeControl.js';

import { extractValuesByXpath } from './utils.js';

function Extract(props) {
  const functions = [
    ["remove", () => { props.removeExtract(props.xpath) }, '', 'remove extract']
  ]

  const controls = functions.map(([label, handler, classes, title], index) => {
    return(
      <NodeControl key={index} classes={classes} handler={handler} label={label} title={title} />
    );
  });

  const content =
    <div className="extract">
      <p><b>{props.xpath}</b>{ controls }</p>
      <p>{props.values}</p>
    </div>;
  return content;
}

function Extracts(props) {
  let content;
  if(props.xpaths.length > 0) {
    const xpathsWithContent = props.xpaths.map((xpath, index) => {
      const content = extractValuesByXpath(xpath, props.parsed).join(', ');

      return [xpath, content];
    });

    const extracts = xpathsWithContent.map(([xpath, values], index) => {
      return <Extract key={index} xpath={xpath} values={values} removeExtract={props.removeExtract} />;
    });

    content =
      <React.Fragment>
        <div className="extracts-container">
          { extracts }
        </div>
      </React.Fragment>;
  } else {
    content = "You have no extracts set."
  }

  return content;
}

export default Extracts;
