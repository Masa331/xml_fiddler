import React, { Component } from 'react';
import convert from 'xml-js';

import Fiddler from './components/Fiddler.js';
import Extracts from './components/Extracts.js';

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

    this.state = { key: '', source: {}, xpaths: [] };

    this.resetFile = this.resetFile.bind(this);
    this.loadExample = this.loadExample.bind(this);
    this.addExtract = this.addExtract.bind(this);
    this.removeExtract = this.removeExtract.bind(this);
  }

  resetFile(event) {
    event.target.files[0].text()
      .then((result) => {
        const newSource = parseXml(result);
        const key = Math.random(); //TODO: this is here so Fiddler components
        // resets every time new document is loaded. Otherwise Old document stayed there. Probably could be fixed a better way..
        this.setState({ source: newSource, key: key });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  loadExample(event) {
    const newSource = parseXml(exampleXml);
    this.setState({ source: newSource });
  }

  addExtract(value) {
    let newXpaths = this.state.xpaths.slice();
    newXpaths.push(value);

    this.setState({ xpaths: newXpaths });
  }

  removeExtract(value) {
    const newXpaths = this.state.xpaths.filter((xpath) => {
      return xpath !== value;
    });

    this.setState({ xpaths: newXpaths });
  }

  render() {
    return (
      <React.Fragment>
        <section id="extracts">
          <div className="nav-container">
            <h1>XML Fiddler</h1>

            <div className="buttons">
              <button onClick={this.loadExample}>load example</button>
              <input type="file" onChange={this.resetFile}/>
            </div>

            <nav>
              <a className="extracts" href="#extracts"><b>Extracts</b></a>
              <a className="document" href="#document">Document</a>
            </nav>
          </div>

          <Extracts parsed={this.state.source} xpaths={this.state.xpaths} removeExtract={this.removeExtract} />
        </section>

        <main className="highlight" id="document">
          <div className="nav-container">
            <h1>XML Fiddler</h1>

            <div className="buttons">
              <button onClick={this.loadExample}>load example</button>
              <input type="file" onChange={this.resetFile}/>
            </div>

            <nav>
              <a className="extracts" href="#extracts">Extracts</a>
              <a className="document" href="#document"><b>Document</b></a>
            </nav>
          </div>

          <Fiddler key={this.state.key} parsed={this.state.source} addExtract={this.addExtract} />
        </main>
      </React.Fragment>
    );
  }
}

export default App;
