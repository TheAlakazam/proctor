import React from 'react';
import Fullscreen from 'react-fullscreen-crossbrowser';
import './App.css';
import MainPage from './component/MainPage';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import InfoPage from './component/InfoPage';
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <InfoPage/>
        </Route>
        <Route path="/test">
          <MainPage/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
