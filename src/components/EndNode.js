import React, { Component } from 'react';
import OpenTag from './OpenTag.js';
import CloseTag from './CloseTag.js';

class EndNode extends Component {
  render() {
    return (
      <div className="sub-level">
        <OpenTag name={this.props.name}/>
        {this.props.text}
        <CloseTag name={this.props.name} />
      </div>
    );
  }
}

export default EndNode;
