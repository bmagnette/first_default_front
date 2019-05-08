import React, { Component } from 'react';
import './public/css/PublicApp/App.css';
import RouterExample from "./RouterExample";

const API_KEY = `${process.env.REACT_APP_API_KEY}`;

class App extends Component {
  render() {
    return (
      <div>
          <RouterExample/>
      </div>
    );
  }
}

export default App;
