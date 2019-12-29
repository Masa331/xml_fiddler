import React, { Component } from 'react';

import nodeFactory from './nodeFactory.js';
import Declaration from './Declaration.js';

class Fiddler extends Component {
  render() {
    let content;

    if (Boolean(this.props.parsed.elements)) {
      content =
        <div>
          <Declaration {...this.props.parsed.declaration} />

          { this.props.parsed.elements.map((element, index) => {
            return(nodeFactory(element, index, false)[0])
          })}
        </div>
    } else {
      content =
        <React.Fragment>
          no xml uploaded
        </React.Fragment>
    }

    return (
       content
    );
  }
}

export default Fiddler;
