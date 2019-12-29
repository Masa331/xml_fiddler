import React, { Component } from 'react';

class EmptyTag extends Component {
  render() {
    return (
      <span>{'<'}<span className="end-tag">{this.props.name}</span>{'/>'}</span>
    );
  }
}

export default EmptyTag;
