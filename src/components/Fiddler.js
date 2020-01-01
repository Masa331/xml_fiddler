import React from 'react';

import Node from './Node.js';
import Declaration from './Declaration.js';

function Fiddler(props) {
  let content;

  if (Boolean(props.parsed.elements)) {
    content =
      <div>
        <Declaration {...props.parsed.declaration} />

        { props.parsed.elements.map((element, index) => {
          return <Node
              key={index}
              name={element.name}
              elements={element.elements}
              attributes={element.attributes}
              text={element.elements[0].text}
              cdata={element.elements[0].cdata}
            />;
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
