import React, { Component } from 'react';

class OpenTag extends Component {
  constructor(props) {
    super(props);

    this.state = { name: 'tag', attributes: [] };
  }

  render() {
    let controls = (this.props.functions || []).map((func) => {
      const label = func[0];
      const handler = func[1];

      return(
        <React.Fragment>
          <span className="node-control" onClick={handler}>{label}</span>
          &nbsp;
        </React.Fragment>
      )
    })

    return (
      <React.Fragment>
        <span>{'<' + this.props.name + '>'}</span>
        { controls }
      </React.Fragment>
    );
  }
}

export default OpenTag;
