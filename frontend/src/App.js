import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Dashboard from './Dashboard/Dashboard';
import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/:docId" component={Dashboard} />
        <Redirect from="/" to="/" />
      </Switch>
    </Router>
  );
}

export default App;
