import React, { Component } from 'react';

class OpenTag extends Component {
  constructor(props) {
    super(props);

    this.state = { name: 'tag', attributes: [] };
  }

  render() {
    let controls;

    if (this.props.collapse) {
      controls =
        <React.Fragment>
          <span className="node-control" onClick={this.props.expand}>+</span>
          &nbsp;
          <span className="node-control" onClick={this.props.collapse}>-</span>
          &nbsp;
          <span className="node-control" onClick={this.props.expandChildren}>++</span>
          &nbsp;
          <span className="node-control" onClick={this.props.collapseChildren}>--</span>
        </React.Fragment>
    } else {
      controls = <span></span>
    }

    return (
      <React.Fragment>
        <span>{'<' + this.props.name + '>'}</span>
        { controls }
      </React.Fragment>
    );
  }
}

export default OpenTag;
