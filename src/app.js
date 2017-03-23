import React from 'react';

import Nav from './nav';

import './index.css';
import './app.css';

const App = ({ children }) => (
  <div className="App">
    <Nav />
    <div className="App-main">
      { children }
    </div>
  </div>
);


export default App;
