import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import {
    BrowserRouter as Router,
    Route,
    Switch
  } from 'react-router-dom'

const About = () => (
  <div>
    <div className="row">
          <div className="col-md-8 col-md-offset-2">
            <p>This is interactive online metro/subway/undeground map. Enjoy!</p>
          </div>
        </div>
  </div>
)

const NoMatch = ({ location }) => (
  <div>
    <h3>This is 404 Page. No match for <code>{location.pathname}</code></h3>
  </div>
)


ReactDOM.render(
    <Router>
    <div>
      <Switch>
        <Route exact path="/" component={App}/>
        <Route path="/about" component={About}/>
        <Route path="/prague" component={App}/>
        <Route component={NoMatch}/>
      </Switch>
    </div>
    </Router>
    , document.getElementById('root')
);
registerServiceWorker();
