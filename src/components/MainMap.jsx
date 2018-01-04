import React, { Component } from 'react';

import paper, {Point, Path, Raster} from 'paper';

import PF from 'pathfinding';

import ctrl from '../core/mainController';

class MainMap extends Component {
  constructor(props) {
    super(props);
    this.stationsDict = {};
    this.firstStation = '';
    this.secondStation = '';
    this.resultPath = null;
  }
    
  initMap(component) {
    paper.setup(component);

    var raster = new Raster('mainImage');

    raster.on('load', function() {
      this.position = this.size.divide(2);
    });
    // if (this.props.stationList.length > 0) {
    //   this.getInformationAndDraw();
    //   console.log('draw first');
    //   // this.drawCircle(100,100);
    // }
    this.getStationInformation();
    this.findPath();
    this.drawStations();
    this.drawPath();
    this.drawSelection();

    paper.view.draw();
  }

  getStationInformation() {
    if (this.props.stationList.length > 0 && Object.keys(this.stationsDict).length === 0) {
      this.fillDict(this.props.stationList);
    }
  }

  drawSelection() {
    console.log('selection draw');
    //console.log(this.firstStation);
    if (typeof this.stationsDict[this.firstStation] !== "undefined") {
      console.log('selection1 draw');
      this.stationsDict[this.firstStation].circleLink.fillColor = 'red';
    }
    if (typeof this.stationsDict[this.secondStation] !== "undefined") {
      console.log('selection2 draw');
      this.stationsDict[this.secondStation].circleLink.fillColor = 'red';
    }
  }

  drawStations() {
    var self = this;
    console.log('start drawing dict');
    for (let prop in this.stationsDict) {
      console.log("obj." + prop + " = " + this.stationsDict[prop]);
      
      this.stationsDict[prop].circleLink = this.drawCircle(this.stationsDict[prop].xreal,this.stationsDict[prop].yreal);
      this.stationsDict[prop].circleLink.onMouseDown = function(event) {
        if (self.firstStation === '') {
          self.firstStation = prop;

        } else if (self.secondStation === '') {
          self.secondStation = prop;
        } else if (self.firstStation !== '' && self.secondStation !== '') {
          self.firstStation = prop;
          self.secondStation = '';
          self.resultPath = null;
        }

        console.log('first=');
        console.log(self.firstStation);
        console.log('second=');
        console.log(self.secondStation);

        let tempStation1 = '';
        let tempStation2 = '';
        if (typeof self.stationsDict[self.firstStation] !== "undefined") {
          tempStation1 =self.stationsDict[self.firstStation].name;
        }
        if (typeof self.stationsDict[self.secondStation] !== "undefined") {
          tempStation2 =self.stationsDict[self.secondStation].name;
        }
        self.props.onMapSelectStation(tempStation1,tempStation2);
      }
    }
    console.log('stop drawing dict');
  }
  
  fillDict(stationList) {
    var self = this;
    console.log('start filling dict');
    stationList.forEach(function(element) {
      var dictKey = `x${element.xmatrix}y${element.ymatrix}`;
      this.stationsDict[dictKey] = element;
  
    }, this);
    console.log('stop filling dict');
  }

  // clearSelection() {
  //   console.log('start clearing');
  //   for (var prop in this.stationsDict) {
  //     console.log("obj." + prop + " = " + this.stationsDict[prop]);
  //     this.stationsDict[prop].circleLink.fillColor = 'black';
  //   }
  //   console.log('stop clearing');
  // }

  findCoordStationByName(stationName) {
    for (var prop in this.stationsDict) {
      if (this.stationsDict[prop].name === stationName) {
        return prop;
      }
    }
    return '';
  }
  
  findPath() {
    console.log('start finding path');
    if (this.firstStation === '' || this.secondStation === '') {
      console.log('return');
      return;
    }
    if (this.resultPath !== null) {
      console.log(this.resultPath);
      console.log('return');
      return;
    }
    var matrix = [
      [0, 0, 0, 0, 0]
    ];
    
    var matrixPrague = [
      [0, 0, 0, 0, 0]
    ];

    var grid = new PF.Grid(matrix);
    var finder = new PF.AStarFinder();
    //var path = finder.findPath(3, 0, 0, 0, grid);
    this.resultPath = finder.findPath(this.stationsDict[this.firstStation].xmatrix, this.stationsDict[this.firstStation].ymatrix, 
      this.stationsDict[this.secondStation].xmatrix, this.stationsDict[this.secondStation].ymatrix, grid);
    console.log('path=');
    this.resultPath = this.resultPath.filter((elem)=>{
      return typeof this.stationsDict[`x${elem[0]}y${elem[1]}`] !== "undefined";
    });

    console.log(this.resultPath);
    this.props.onPathFound(this.resultPath.map((elem)=>{
      let station = this.stationsDict[`x${elem[0]}y${elem[1]}`];
      return station.name;
    }));
    console.log('stop finding path');
  }

  drawPath() {
    console.log('start draw path');
    if (this.resultPath === null) {
      return;
    }
    for (var i=0;i<this.resultPath.length;i++) {
      if (i>0) {
        console.log(this.stationsDict[`x${this.resultPath[i][0]}y${this.resultPath[i][1]}`]);
        var station1 = this.stationsDict[`x${this.resultPath[i-1][0]}y${this.resultPath[i-1][1]}`];
        var station2 = this.stationsDict[`x${this.resultPath[i][0]}y${this.resultPath[i][1]}`];
        this.drawLine(station1.xreal,station1.yreal,station2.xreal,station2.yreal);
        station1.circleLink.fillColor = 'green';
        station2.circleLink.fillColor = 'green';
      };
    }
    console.log('stop draw path');
  }

  drawCircle(x,y){
    var self = this; 
    var cc = new Path.Circle({
      center: new Point(x, y),
      radius: 20,
      fillColor: 'black'
    });
    return cc;
  };
  
  drawLine(x1,y1,x2,y2) {
    var from = new Point(x1, y1);
    var to = new Point(x2, y2);
    var line = new Path.Line(from, to);
    line.strokeColor = 'black';
  }

  render() {
    console.log(this.props);
    let {stationOne,stationTwo} = this.props;
    var station1 = this.findCoordStationByName(stationOne);
    var station2 = this.findCoordStationByName(stationTwo);
    if (this.firstStation !== station1 || this.secondStation !== station2) {
      this.resultPath = null;
    };
    this.firstStation = this.findCoordStationByName(stationOne);
    this.secondStation = this.findCoordStationByName(stationTwo);
    
    return (
      <div className="mainMap">
        <img src="prague_metro.svg" id="mainImage" style={{display: 'none'}} ></img>
        <div className="container-fluid">
          <div className="row">
              <div className="col-sm-1"></div>
              <div className="col-sm-10"><canvas id="myCanvas" ref={ ref => { this.initMap(ref); } } resize="true"></canvas></div>
              <div className="col-sm-1"></div>
            </div>
        </div>
      </div>
    );
  }
}

export default MainMap;