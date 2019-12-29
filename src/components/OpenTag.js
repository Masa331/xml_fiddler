import React, { Component } from 'react';

class OpenTag extends Component {
  render() {
    let controls = (this.props.functions || []).map((func, index) => {
      const label = func[0];
      const handler = func[1];

      return(
        <span key={index} className="node-control" onClick={handler}>{label}</span>
      )
    })

    return (
      <span>
        <span>{'<'}<span className="start-tag">{this.props.name}</span>{'>'}</span>
        { controls }
      </span>
    );
  }
}

export default OpenTag;
