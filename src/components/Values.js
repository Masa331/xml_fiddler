import React from 'react';

import { extractValuesByXpath } from './utils.js';

function ValueGroup(props) {
  const content =
    <div>
      <p>{props.xpath}</p>
      <p>{props.values}</p>
    </div>;
  return content;
}

function Values(props) {
  const xpathsWithContent = props.xpaths.map((xpath, index) => {
    const content = extractValuesByXpath(xpath, props.parsed).join(', ');

    return [xpath, content];
  });

  const valueGroups = xpathsWithContent.map(([xpath, values], index) => {
    return <ValueGroup key={index} xpath={xpath} values={values} />;
  });

  const content =
      <React.Fragment>
        { valueGroups }
      </React.Fragment>;

  return content;
}

export default Values;
