import React from 'react';
import './App.css';
import { Router, Link } from "@reach/router";

import PersistentDrawerLeft from "./components/PersistentDrawer";
import HomePage from "./pages/HomePage";
import Details from "./pages/UserDetails";
import Resources from "./pages/ResourcesPage";
import MyResource from "./pages/MyResourcePage";


function App() {
  return (
  /*  <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
    */
    <div>
        <Router>
            <HomePage path="/index" />
            <PersistentDrawerLeft path="/">
                {/*<Router>*/}
                <Details path="/detail" />
                <Resources path="/resource" />
                <MyResource path="/myResource" />
                {/*</Router>*/}
            </PersistentDrawerLeft>
        </Router>

    </div>
  );
}

export default App;
