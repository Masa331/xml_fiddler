import React, { Component } from 'react';
import convert from 'xml-js';

import Fiddler from './components/Fiddler.js';

function parseXml(xml) {
  const json = convert.xml2json(xml, { compact: false });
  const parsed = JSON.parse(json);

  return parsed;
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { source: {} };

    this.resetFile = this.resetFile.bind(this);
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

  render() {
    return (
      <React.Fragment>
        <nav>
          <h1>XML Fiddler</h1>
          <p>Upload XML to play with</p>
          <input type="file" onChange={this.resetFile}/>

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
