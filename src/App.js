import React, { Component } from 'react';
import './App.css';

import nodeFactory from './components/nodeFactory.js';

const convert = require('xml-js');

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


const Declaration = (props) => {
  var attrs = [];
  for (var attr in props.attributes) {
    if (props.attributes.hasOwnProperty(attr)) {
      attrs.push(`${attr}="${props.attributes[attr]}"`)
    }
  }

  return (
    <span>
      {'<?xml'} {attrs.join(' ')} {'?>'}
    </span>
  );
}

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
