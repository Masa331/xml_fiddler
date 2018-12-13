import React, { Component } from 'react';
class CloseTag extends Component {
  constructor(props) {
    super(props);

    this.state = { name: 'tag' };
  }

  render() {
    return (
      <span>{'</' + this.props.name + '>'}</span>
    );
  }
}

export default CloseTag;
