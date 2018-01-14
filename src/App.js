import React, { Component } from 'react';
import './App.css';

import MainMap from './components/MainMap';
import StationCombobox from './components/StationCombobox';
import StationList from './components/StationList';
import ctrl from './core/mainController';

class App extends Component {
  
  constructor(props) {
    super(props);
    //this.stationPath = ['test','test2']
    this.state = {
      stationPath: [],
      stationFrom: undefined,
      stationTo: undefined,
      stationList: []
    };

    ctrl.getStations('/api/stations.json')
    .then((html) => {
      this.setState({stationList: JSON.parse(html).data});
    })
    .catch((err) => console.error(err));


  }

  handlePathFound(resultPath) {
    this.setState({stationPath: resultPath});
  }

  handleSelectStationFrom(station) {
    this.setState({stationFrom: station});
  }

  handleSelectStationTo(station) {
    this.setState({stationTo: station});
  }

  handleMapSelectStation(station1,station2) {
    this.setState({      
      stationFrom: station1,
      stationTo: station2
    });
    //this.stationPath = [station1, station2];
  }

  render() {
    let {stationPath, stationFrom, stationList, stationTo} = this.state;
    return (
      <div className="App">
      
        <div className="container-fluid">
          <div className="row">
          </div>
          <div className="row">
            <div className="col-md-10 col-md-offset-2">
              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="cmbFrom">From</label>
                  <StationCombobox onChangeSelection={this.handleSelectStationFrom.bind(this)} stationName={stationFrom} stationList={stationList}/>
                </div>
                <div className="col-md-6">
                  <label htmlFor="cmbTo">To</label>
                  <StationCombobox onChangeSelection={this.handleSelectStationTo.bind(this)} stationName={stationTo} stationList={stationList}/>
                </div>
              </div> 
            </div>
          </div>
          <div className="row fill">
            <div className="col-md-2">
              <StationList stations={stationPath}/>
            </div>
            <div className="col-md-10 hidden-xs">
              <MainMap onMapSelectStation={this.handleMapSelectStation.bind(this)} 
                stationOne={stationFrom} stationTwo={stationTo} stationList={stationList}
                onPathFound={this.handlePathFound.bind(this)}/>
            </div>
          </div>

          <div className="row">
            <div className="col-md-10 col-md-offset-2">
              <p>This is interactive online metro(underground) map of Prague.It allows you to easily find the needed route between stations. Even though the scheme of the prague metro map is not too complex and contains only 3 main line, we hope that this website with prague metro map would be useful for you in the future. Please don’t forget that Prague metro openings hours: 5:00am - 12:00pm. The average time that it requires to reach one station from another is about 2 minutes. During working hours prague metro has 2-3 minutes interval between trains, but during weekends and public holidays it could be up to 10 minutes, because of that be carefull with prague online metro map and plan your trip in advance. Prague online metro map has 3 lines: Line A (color green), Line B (color yellow) and Line C (color red). If you want to switch between lines during your trip within prague metro you can use three key transfer station: Muzeum (red-green), Mustek(yellow-green), Florenc(yellow-red).</p>
            </div>
          </div>

          <div className="row">
          {/* <nav class="navbar navbar-default">
            <div class="container">

            </div>
          </nav> */}
          </div>           
        </div>
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