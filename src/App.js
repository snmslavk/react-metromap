import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import MainMap from './components/MainMap';
import StationCombobox from './components/StationCombobox';
import StationList from './components/StationList';

class App extends Component {
  
  constructor(props) {
    super(props);
    this.stationPath = ['test','test2']
    this.state = {
      stationPath: [],
      stationFrom: null,
      stationTo: null,
      stationList: []
    };
  }
  handleSelectStationFrom(station) {
    this.setState({stationFrom: station});
  }

  handleMapSelectStation(station1,station2) {
    this.setState({stationPath: [station1, station2]});
    //this.stationPath = [station1, station2];
  }

  render() {
    var thisTestValue = 'fff';
    var {stationPath, stationFrom} = this.state;
    return (
      <div className="App">
        <StationCombobox onChangeSelection={this.handleSelectStationFrom.bind(this)} stationName={stationFrom}/>
        <StationCombobox stationName={thisTestValue}/>
        <StationList stations={stationPath}/>
        <MainMap onMapSelectStation={this.handleMapSelectStation.bind(this)} stationOne={stationFrom} stationTwo={thisTestValue} testProp={thisTestValue}/>
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