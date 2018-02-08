import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Footer from './components/Footer';
import HeaderNavigation from './components/HeaderNavigation';

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
        <Route exact path="/" render={(props) => <App city="Prague" {...props}/>}/>
        <Route path="/about" component={About}/>
        <Route path="/prague" render={(props) => <App city="Prague" {...props}/>}/>
        <Route path="/lisbon" render={(props) => <App city="Lisbon" {...props}/>}/>
        <Route path="/paris" render={(props) => <App city="Paris" {...props}/>}/>
        <Route path="/amsterdam" render={(props) => <App city="Amsterdam" {...props}/>}/>
        <Route component={NoMatch}/>
      </Switch>
    </div>
    </Router>
    , document.getElementById('root')
);
ReactDOM.render(
  <HeaderNavigation />
  , document.getElementById('header')
);
ReactDOM.render(
  <Footer />
  , document.getElementById('footer')
);

registerServiceWorker();
