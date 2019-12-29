import React, { Component } from 'react';

class OpenTag extends Component {
  constructor(props) {
    super(props);

    this.state = { name: 'tag', attributes: [] };
  }

  render() {
    let controls = (this.props.functions || []).map((func, index) => {
      const label = func[0];
      const handler = func[1];

      return(
        <React.Fragment key={index}>
          <span className="node-control" onClick={handler}>{label}</span>
          &nbsp;
        </React.Fragment>
      )
    })

    return (
      <React.Fragment>
        <span>{'<'}<span className="start-tag">{this.props.name}</span>{'>'}</span>
        { controls }
      </React.Fragment>
    );
  }
}

export default OpenTag;
