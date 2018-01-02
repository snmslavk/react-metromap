import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import MainMap from './components/mainMap';

class App extends Component {

  render() {
    return (
      <div className="App">
        <MainMap />
      </div>
    );
  }
}

// как взаимодействовать с DOM компонента
// https://stackoverflow.com/questions/32171718/unable-to-manipulate-the-dom-in-a-react-component
// https://stackoverflow.com/questions/38093760/how-to-access-a-dom-element-in-react-what-is-the-equilvalent-of-document-getele
export default App;


// beatifull wireframes
// https://gomockingbird.com/projects/yp6egen/4gXVnC