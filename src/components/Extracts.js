import React, { Component } from 'react';
import NodeControl from './NodeControl.js';

import { extractValuesByXpath } from './utils.js';

class Extract extends Component {
  constructor(props) {
    super(props);

    this.toggleUniqueValues = this.toggleUniqueValues.bind(this);
    this.toggleMinMaxValues = this.toggleMinMaxValues.bind(this);
  }

  state = { uniqueValues: false, minMaxValues: false };

  toggleUniqueValues() {
    this.setState({ uniqueValues: !this.state.uniqueValues });
  }

  toggleMinMaxValues() {
    this.setState({ minMaxValues: !this.state.minMaxValues });
  }

  render() {
    const functions = [
      ["remove", () => { this.props.removeExtract(this.props.xpath) }, '', 'remove extract']
    ]

    const numberOfItems = this.props.values.length;

    const controls = functions.map(([label, handler, classes, title], index) => {
      return(
        <NodeControl key={index} classes={classes} handler={handler} label={label} title={title} />
      );
    });

    const checkboxes =
      <React.Fragment>
        <label className="node-control">
          <input type="checkbox" value="foo" onChange={this.toggleUniqueValues}/>
            unique
        </label>
        <label className="node-control">
          <input type="checkbox" value="foo" onChange={this.toggleMinMaxValues}/>
            min max
        </label>
      </React.Fragment>;

    let values = this.props.values;
    if (this.state.uniqueValues) {
      values = [...new Set(values)];
    }
    if (this.state.minMaxValues) {
      const min = values.reduce((min, val) => val < min ? val : min, values[0]);
      const max = values.reduce((min, val) => val > min ? val : min, values[0]);
      values = [min, max];
    }

    const content =
      <div className="extract">
        <p><b>{this.props.xpath}</b> { numberOfItems } items { controls } { checkboxes }</p>
        <p>{values.join(', ')}</p>
      </div>;
    return content;
  }
}

function Extracts(props) {
  let content;
  if(props.xpaths.length > 0) {
    const xpathsWithContent = props.xpaths.map((xpath, index) => {
      const content = extractValuesByXpath(xpath, props.parsed);

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
    content =
      <p>
        When you click on 'Extract' button near XML node in Document tab the extracted data will show up here. Now you don't have any extracts yet.
      </p>
  }

  return content;
}

export default Extracts;
