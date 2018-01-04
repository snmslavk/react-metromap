import React, { Component } from 'react';

import paper, {Point, Path, Raster} from 'paper';

import PF from 'pathfinding';

import ctrl from '../core/mainController';

class MainMap extends Component {
  constructor(props) {
    super(props);
    // console.log('map props!!!')
    // console.log(props);
    // console.log(this.props);    
    // console.log('map props!!!')
    let {stationFrom,stationTo} = props;
    this.stationsDict = {};
    this.firstStation = null;
    this.secondStation = null;
    this.resultPath = null;
    //this.stationList = stationList;
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
    this.drawStations();
    this.drawPath();
    this.drawSelection();
    
    //console.log('draw second');
    // this.drawCircle(200,200);

    //paper.view.draw();
  }

  getStationInformation() {
    // ctrl.getStations('/api/stations.json')
    //   .then((html) => {
    //     let stationList = JSON.parse(html).data;
    //     this.fillDict(stationList);
    //     //this.findPath();
    //   })
    //   .catch((err) => console.error(err));
    if (this.props.stationList.length > 0 && Object.keys(this.stationsDict).length === 0) {
      this.fillDict(this.props.stationList);
    }
  }

  drawSelection() {
    if (typeof this.stationsDict[this.firstStation] !== "undefined") {
      this.stationsDict[this.firstStation].circleLink.fillColor = 'red';
    }
    if (typeof this.stationsDict[this.secondStation] !== "undefined") {
      this.stationsDict[this.secondStation].circleLink.fillColor = 'red';
    }
  }

  drawStations() {
    var self = this;
    console.log('start drawing dict');
    for (let prop in this.stationsDict) {
      console.log("obj." + prop + " = " + this.stationsDict[prop]);
      
      this.stationsDict[prop].circleLink = this.drawCircle(this.stationsDict[prop].xreal,this.stationsDict[prop].yreal);
      //this.stationsDict[prop].circleLink.fillColor = 'red';
      //let dictKey = prop;
      this.stationsDict[prop].circleLink.onMouseDown = function(event) {
        if (self.firstStation === null) {
          self.firstStation = prop;
          //this.fillColor = 'red';
        } else if (self.secondStation === null) {
          self.secondStation = prop;
          //this.fillColor = 'red';
          self.findPath();
        } else if (self.firstStation !== null && self.secondStation !== null) {
          self.clearSelection();
          self.firstStation = prop;
          self.secondStation = null;
          self.resultPath = null;
        }
        //this.fillColor = 'red';
        console.log('first=');
        console.log(self.firstStation);
        console.log('second=');
        console.log(self.secondStation);
        // console.log('path=');
        // console.log(self.secondStation);

        //console.log(prop);
        let tempStation1, tempStation2;
        if (typeof self.stationsDict[self.firstStation] !== "undefined") {
          tempStation1 =self.stationsDict[self.firstStation].name;
          self.stationsDict[self.firstStation].circleLink.fillColor = 'red';
        }
        if (typeof self.stationsDict[self.secondStation] !== "undefined") {
          tempStation2 =self.stationsDict[self.secondStation].name;
          self.stationsDict[self.secondStation].circleLink.fillColor = 'red';
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
      //element.circleLink = this.drawCircle(element.xreal,element.yreal);
      var dictKey = `x${element.xmatrix}y${element.ymatrix}`;
      //console.log(element);
      // element.circleLink.onMouseDown = function(event) {
      //   if (self.firstStation === null) {
      //     self.firstStation = dictKey;
      //     //this.fillColor = 'red';
      //   } else if (self.secondStation === null) {
      //     self.secondStation = dictKey;
      //     //this.fillColor = 'red';
      //     self.findPath();
      //   } else if (self.firstStation !== null && self.secondStation !== null) {
      //     self.clearSelection();
      //     self.firstStation = dictKey;
      //     self.secondStation = null;
      //     this.resultPath = null;
      //   }
      //   //this.fillColor = 'red';
      //   console.log('first=');
      //   console.log(self.firstStation);
      //   console.log('second=');
      //   console.log(self.secondStation);
      //   //console.log(dictKey);
      //   let tempStation1, tempStation2;
      //   if (typeof self.stationsDict[self.firstStation] !== "undefined") {
      //     tempStation1 =self.stationsDict[self.firstStation].name;
      //     //self.stationsDict[self.firstStation].circleLink.fillColor = 'red';
      //   }
      //   if (typeof self.stationsDict[self.secondStation] !== "undefined") {
      //     tempStation2 =self.stationsDict[self.secondStation].name;
      //     //self.stationsDict[self.secondStation].circleLink.fillColor = 'red';
      //   }
      //   self.props.onMapSelectStation(tempStation1,tempStation2);
      // }
      this.stationsDict[dictKey] = element;
  
    }, this);
    console.log('stop filling dict');
  }

  clearSelection() {
    console.log('start clearing');
    for (var prop in this.stationsDict) {
      console.log("obj." + prop + " = " + this.stationsDict[prop]);
      this.stationsDict[prop].circleLink.fillColor = 'black';
    }
    console.log('stop clearing');
  }
  
  findPath() {
    console.log('start finding path');
    this.clearSelection();
    var matrix = [
      [0, 0, 0, 0]
    ];
    
    var grid = new PF.Grid(matrix);
    var finder = new PF.AStarFinder();
    //var path = finder.findPath(3, 0, 0, 0, grid);
    this.resultPath = finder.findPath(this.stationsDict[this.firstStation].xmatrix, this.stationsDict[this.firstStation].ymatrix, 
      this.stationsDict[this.secondStation].xmatrix, this.stationsDict[this.secondStation].ymatrix, grid);
    console.log('path=');
    console.log(this.resultPath);
    // var i=0;
    // for (var i=0;i<path.length;i++) {
    //   if (i>0) {
    //     //console.log(this.stationsDict[`x${path[i][0]}y${path[i][1]}`]);
    //     var station1 = this.stationsDict[`x${path[i-1][0]}y${path[i-1][1]}`];
    //     var station2 = this.stationsDict[`x${path[i][0]}y${path[i][1]}`];
    //     this.drawLine(station1.xreal,station1.yreal,station2.xreal,station2.yreal);
    //     station1.circleLink.fillColor = 'green';
    //     station2.circleLink.fillColor = 'green';
    //   };
    // }
    //this.props.onMapSelectStation('station1','station2');
    this.props.onPathFound(this.resultPath.map((elem)=>{
      let station = this.stationsDict[`x${elem[0]}y${elem[1]}`];
      return station.name;
    }));
    console.log('stop finding path');
  }

  drawPath() {
    if (this.resultPath === null) {
      return;
    }
    for (var i=0;i<this.resultPath.length;i++) {
      if (i>0) {
        //console.log(this.stationsDict[`x${path[i][0]}y${path[i][1]}`]);
        var station1 = this.stationsDict[`x${this.resultPath[i-1][0]}y${this.resultPath[i-1][1]}`];
        var station2 = this.stationsDict[`x${this.resultPath[i][0]}y${this.resultPath[i][1]}`];
        this.drawLine(station1.xreal,station1.yreal,station2.xreal,station2.yreal);
        station1.circleLink.fillColor = 'green';
        station2.circleLink.fillColor = 'green';
      };
    }
  }

  drawCircle(x,y){
    var self = this; 
    var cc = new Path.Circle({
      center: new Point(x, y),
      radius: 20,
      fillColor: 'black'
    });
    // cc.onMouseDown = function(event) {
    //   // console.log(self.stationsDict);
    //   // this.fillColor = 'red';
    //   if (this.firstStation === null) {

    //   } else if (this.secondStation === null) {

    //   } else if (this.firstStation !== null && this.secondStation !== null) {
    //     this.findPath();
    //   }
    // }
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