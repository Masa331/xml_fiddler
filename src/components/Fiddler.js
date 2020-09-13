import React from 'react';

import Node from './Node.js';
import Declaration from './Declaration.js';

function Fiddler(props) {
  let content;

  if (Boolean(props.parsed.elements)) {
    content =
      <React.Fragment>
        <Declaration {...props.parsed.declaration} />

        { props.parsed.elements.map((element, index) => {
          return <Node
              key={index}
              name={element.name}
              elements={element.elements}
              attributes={element.attributes}
              text={element.elements[0].text}
              cdata={element.elements[0].cdata}
              xpath={element.xpath}
              addExtract={props.addExtract}
              removeExtract={props.removeExtract}
            />;
        })}
      </React.Fragment>
  } else {
    content =
      <div>
        <p>
          This is a simple tool for quick XML exploration.
        </p>

        <p>
          Currently it can group collapse nodes, click to copy xpaths and extract values from nodes. It probably won't work with files too big but it isn't the goal now.
        </p>

        <p>
          If you miss some feature or encounter a bug, please let me know via <a href="https://github.com/Masa331/xml_fiddler">Github issues</a>. I will be happy to look into it.
        </p>

        <p>
          Now you can load example file or upload your own in the menu.
        </p>

        <p>
          Created by <a href="https://github.com/Masa331">Premysl Donat</a>.
        </p>
      </div>
  }

  return content;
}

export default Fiddler;
