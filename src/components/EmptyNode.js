import React, { Component } from 'react';
import EmptyTag from './EmptyTag.js';

const repeat = function(str, times) {
  return (new Array(times + 1)).join(str);
};

class EmptyNode extends Component {
  constructor(props) {
    super(props);

    this.state = { name: '', indentation: 0 };
  }

  spaces() {
    return <span dangerouslySetInnerHTML={{ __html: repeat("&nbsp;", this.props.indentation) }} />
  }

  render() {
    return (
      <React.Fragment>
        {this.spaces()}
        <EmptyTag name={this.props.name} />
      </React.Fragment>
    );
  }
}

export default EmptyNode;
