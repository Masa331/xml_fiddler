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
          This is simple tool for quick XML exploration.
        </p>

        <p>
          It can group collapse nodes, click to copy xpaths and extract values from nodes. It probably won't work with too big files but it isn't the goal.
        </p>

        <p>
          Now you can load example file or upload your own in the menu.
        </p>

        <p>
          Created by <a href="https://masa331.github.io/">Premysl Donat</a>. You can file and issue on <a href="https://github.com/Masa331/xml_fiddler">Github</a>.
        </p>
      </div>
  }

  return content;
}

export default Fiddler;
