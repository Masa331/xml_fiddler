import React, { Component } from 'react';
import convert from 'xml-js';

import Fiddler from './components/Fiddler.js';

function addXpaths(tree, parentXPath) {
  tree.xpath = parentXPath + '/' + tree.name;

  (tree.elements || []).forEach((element) => {
    addXpaths(element, tree.xpath);
  })

  return tree;
}

function parseXml(xml) {
  const json = convert.xml2json(xml, { compact: false });
  const parsed = JSON.parse(json);

  parsed.name = ''; // so we have proper root xpath and not '/undefined/'
  const withXpaths = addXpaths(parsed, '');

  return withXpaths;
}

const exampleXml = `
<?xml version='1.0' encoding='utf-8'?>
<note importance='high' due="1.1.2021">
  <empty/>
  <emptyWithAttributes importance='low'/>
  <title>Look Ma!</title>
  <todo>ol sok</todo>
  <details>
    <param>something 1</param>
    <param>something 2</param>

    <complicatedParam1>
      <param>something</param>
    </complicatedParam1>
    <complicatedParam2>
      <param>something</param>
    </complicatedParam2>
    <complicatedParam3>
      <verySpecialParam><![CDATA[this is gonna be fun]]></verySpecialParam>
    </complicatedParam3>
  </details>
</note>
`;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { source: {} };

    this.resetFile = this.resetFile.bind(this);
    this.loadExample = this.loadExample.bind(this);
  }

  resetFile(event) {
    event.target.files[0].text()
      .then((result) => {
        const newSource = parseXml(result);
        this.setState({ source: newSource });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  loadExample(event) {
    const newSource = parseXml(exampleXml);
    this.setState({ source: newSource });
  }

  render() {
    return (
      <React.Fragment>
        <nav>
          <h1>XML Fiddler</h1>
          <p>Upload XML to play with</p>
          <input type="file" onChange={this.resetFile}/>
            <p>Or <button onClick={this.loadExample}>load example</button></p>

          <footer>
            <p>By <a href="https://github.com/Masa331">me</a>. Report issues <a href="https://github.com/Masa331/xml_fiddler">here</a>.</p>
          </footer>
        </nav>

        <main className="highlight">
          <Fiddler key={Math.random()} parsed={this.state.source} />
        </main>
      </React.Fragment>
    );
  }
}

export default App;
