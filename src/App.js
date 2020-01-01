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
          <p>Upload XML file to start fiddling</p>
          <input type="file" onChange={this.resetFile}/>
        </nav>
        <main className="highlight">

          <Fiddler parsed = { this.state.source } />
        </main>
      </React.Fragment>
    );
  }
}

export default App;
