import React, { Component } from 'react';
import './App.css';

import MainMap from './components/MainMap';
import StationCombobox from './components/StationCombobox';
import StationList from './components/StationList';
import ctrl from './core/mainController';

class App extends Component {
  
  constructor(props) {
    super(props);
    //console.log(props);
    //this.stationPath = ['test','test2']
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
    //this.stationPath = [station1, station2];
  }

  render() {
    //console.log(this.props);
    let {stationPath, stationFrom, stationList, stationTo, city} = this.state;
    //console.log(`city=${city}`);
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
                <h2 className="display-5">General information</h2>
                <p className="lead">This is interactive online metro(underground) map of Prague.It allows you to easily find the needed route between stations. Even though the scheme of the prague metro map is not too complex and contains only 3 main line, we hope that this website with prague metro map would be useful for you in the future. Please don’t forget that Prague metro openings hours: 5:00am - 12:00pm. The average time that it requires to reach one station from another is about 2 minutes. During working hours prague metro has 2-3 minutes interval between trains, but during weekends and public holidays it could be up to 10 minutes, because of that be carefull with prague online metro map and plan your trip in advance. Prague online metro map has 3 lines: Line A (color green), Line B (color yellow) and Line C (color red). If you want to switch between lines during your trip within prague metro you can use three key transfer station: Muzeum (red-green), Mustek(yellow-green), Florenc(yellow-red)..</p>
              </div>
              </div>
              </div>

              <div className="col-lg-6">
              <div className="mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
              <div className="my-3 p-3">
                <h2 className="display-5">Prices</h2>
                <p className="lead">Individual fares for 1 person in Prague</p>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Ticket type</th>
                      <th scope="col">Adult</th>
                      <th scope="col">Child</th>
                      <th scope="col">Senior</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">Basic (90min.)</th>
                      <td>32</td>
                      <td>16</td>
                      <td>16</td>
                    </tr>
                    <tr>
                      <th scope="row">Short-term (30min.)</th>
                      <td>24</td>
                      <td>12</td>
                      <td>12</td>
                    </tr>
                    <tr>
                      <th scope="row">1 day (24hrs.)</th>
                      <td>110</td>
                      <td>55</td>
                      <td>55</td>
                    </tr>
                    <tr>
                      <th scope="row">3 days (72hrs.)</th>
                      <td>310</td>
                      <td>-</td>
                      <td>-</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              </div>
              </div>

            {/* <div className="col-md-8 offset-md-2">
              <p>This is interactive online metro(underground) map of Prague.It allows you to easily find the needed route between stations. Even though the scheme of the prague metro map is not too complex and contains only 3 main line, we hope that this website with prague metro map would be useful for you in the future. Please don’t forget that Prague metro openings hours: 5:00am - 12:00pm. The average time that it requires to reach one station from another is about 2 minutes. During working hours prague metro has 2-3 minutes interval between trains, but during weekends and public holidays it could be up to 10 minutes, because of that be carefull with prague online metro map and plan your trip in advance. Prague online metro map has 3 lines: Line A (color green), Line B (color yellow) and Line C (color red). If you want to switch between lines during your trip within prague metro you can use three key transfer station: Muzeum (red-green), Mustek(yellow-green), Florenc(yellow-red).</p>
            </div> */}
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