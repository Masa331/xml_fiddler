import React, { Component } from 'react';
class CloseTag extends Component {
  render() {
    return (
      <span>{'</'}<span className="end-tag">{this.props.name}</span>{'>'}</span>
    );
  }
}

export default CloseTag;
