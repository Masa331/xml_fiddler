import React, { Component } from 'react';
import EmptyTag from './EmptyTag.js';

const repeat = function(str, times) {
  return (new Array(times + 1)).join(str);
};

class EmptyNode extends Component {
  render() {
    return (
      <EmptyTag name={this.props.name} />
    );
  }
}

export default EmptyNode;
