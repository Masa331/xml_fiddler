import React from 'react';

import nodeFactory from './nodeFactory.js';
import Declaration from './Declaration.js';

function Fiddler(props) {
  let content;

  if (Boolean(props.parsed.elements)) {
    content =
      <div>
        <Declaration {...props.parsed.declaration} />

        { props.parsed.elements.map((element, index) => {
          return(nodeFactory(element, index, false)[0])
        })}
      </div>
  } else {
    content =
      <React.Fragment>
        no xml uploaded
      </React.Fragment>
  }

  return (
     content
  );
}

export default Fiddler;
