import React, { Component } from 'react';

import nodeFactory from './components/nodeFactory.js';
import Declaration from './components/Declaration.js';
import convert from 'xml-js';

// const convert = require('xml-js');

const xml = `
<?xml version='1.0' encoding='utf-8'?>
<note importance='high'>
  <empty/>
  <title>Look Ma!</title>
  <todo>ol sok</todo>
  <details>
    <param>neco</param>
  </details>
</note>
`;

const json = convert.xml2json(xml, { compact: false });
const parsed = JSON.parse(json);

class App extends Component {
  render() {
    return (
      <div>
        <Declaration {...parsed.declaration} />

        { parsed.elements.map((element, index) => (
          nodeFactory(element, 0, index, false)
        ))}
      </div>
    );
  }
}

export default App;
