import React, { Component } from 'react';
import logo from './logo.svg';
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

    let stationListFromCtrl;
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
    let thisTestValue = 'fff';
    let {stationPath, stationFrom, stationList, stationTo} = this.state;
    return (
      <div className="App">
        <div class="container-fluid">
          <div class="row">
            <nav class="navbar navbar-default"> 
              <div class="container-fluid"> 
                  <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-6"> 
                    <ul class="nav navbar-nav"> <li><a href="#">Home</a></li> <li><a href="#">Prague metro</a></li> 
                    </ul> 
                  </div> 
              </div> 
            </nav>
          </div>
          <div class="row">
            <div class="col-md-8 col-md-offset-2">
              <div class="row">
                <div class="col-md-6">
                  <StationCombobox onChangeSelection={this.handleSelectStationFrom.bind(this)} stationName={stationFrom} stationList={stationList}/>
                </div>
                <div class="col-md-6">
                  <StationCombobox onChangeSelection={this.handleSelectStationTo.bind(this)} stationName={stationTo} stationList={stationList}/>
                </div>
              </div> 
            </div>
          </div>
          <div class="row fill">
            <div class="col-md-2">
              <StationList stations={stationPath}/>
            </div>
            <div class="col-md-10">
              <MainMap onMapSelectStation={this.handleMapSelectStation.bind(this)} 
                stationOne={stationFrom} stationTwo={stationTo} stationList={stationList}
                onPathFound={this.handlePathFound.bind(this)}/>
            </div>
          </div>

          <div class="row">
            <div class="col-md-8 col-md-offset-2">
              <p>Prague metro lines
                The whole underground network is divided into the three main lines, each represented by its own color:

                Line A (green)
                Line B (yellow)
                Line C (red)
                Intervals

                metro operates daily 5:00am – midnight
                two to three minutes between trains during peak hours
                four to nine minutes in off peak hours (after 7:00 pm).
                There are 57 metro stations with 3 important transfer stations – Muzeum (red to green), Můstek (yellow to green) and Florenc (yellow to red). To get from one station to another takes about two minutes.</p>
            </div>
          </div>

          <div class="row">
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