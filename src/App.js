import React, { Component } from 'react';
import './App.css';

import MainMap from './components/MainMap';
import StationCombobox from './components/StationCombobox';
import StationList from './components/StationList';
import ctrl from './core/mainController';
import FooterContentColumn1 from './components/FooterContentColumn1';
import FooterContentColumn2 from './components/FooterContentColumn2';

class App extends Component {
  
  constructor(props) {
    super(props);
    let {city} = props;
    this.state = {
      stationPath: [],
      stationFrom: undefined,
      stationTo: undefined,
      stationList: [],
      city: city
    };

    ctrl.getStations(`/api/stations/${this.state.city}.json`)
    .then((html) => {
      this.setState({stationList: JSON.parse(html).data});
    })
    .catch((err) => console.error(err));
  }

  handlePathFound(resultPath) {
    this.setState({stationPath: resultPath});
  }

  handleSelectStationFrom(station) {
    if (station !== '') {
      this.setState({stationFrom: station});
    }
  }

  handleSelectStationTo(station) {
    let {stationFrom} = this.state;
    if (typeof stationFrom === "undefined") {
      station = '';
    }
    this.setState({stationTo: station});
  }

  handleMapSelectStation(station1,station2) {
    this.setState({      
      stationFrom: station1,
      stationTo: station2
    });
  }

  render() {
    let {stationPath, stationFrom, stationList, stationTo, city} = this.state;
    return (
      <div className="App">
      
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-10  offset-md-2">
              <div className="row pt-2">
                <div className="col-md-6">
                  <StationCombobox onChangeSelection={this.handleSelectStationFrom.bind(this)} stationName={stationFrom} stationList={stationList} stationType="from"/>
                </div>
                <div className="col-md-6">
                  <StationCombobox onChangeSelection={this.handleSelectStationTo.bind(this)} stationName={stationTo} stationList={stationList} stationType="to"/>
                </div>
              </div> 
            </div>
          </div>
          <div className="row">
            <div className="col-md-2">
              <StationList city={city} stations={stationPath}/>
            </div>
            <div className="col-md-10">
               {/* hidden-xs */}
              <MainMap onMapSelectStation={this.handleMapSelectStation.bind(this)} 
                stationOne={stationFrom} stationTwo={stationTo} stationList={stationList} city={city}
                onPathFound={this.handlePathFound.bind(this)}/>
            </div>
          </div>

          <div className="row">
            
            <div className="col-lg-6">
              <div className="mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
                <div className="my-3 p-3">
                  <FooterContentColumn1 city={city}/>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
                <div className="my-3 p-3">
                <FooterContentColumn2 city={city}/>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    );
  }
}

export default App;


// beatifull wireframes
// https://gomockingbird.com/projects/yp6egen/4gXVnC