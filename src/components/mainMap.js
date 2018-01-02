import React, { Component } from 'react';

import paper, {Point, Path, Raster} from 'paper';

import PF from 'pathfinding';

import ctrl from '../core/mainController';

class mainMap extends Component {
  constructor() {
    super();
    this.stationsDict = {};
    this.firstStation = null;
    this.secondStation = null;
  }
    
  initMap(component) {
    paper.setup(component);

    var raster = new Raster('mainImage');

    raster.on('load', function() {
      this.position = this.size.divide(2);
    });

    this.getInformationAndDraw();

    paper.view.draw();
  }

  getInformationAndDraw() {
    ctrl.getStations('/api/stations.json')
      .then((html) => {
        let stationList = JSON.parse(html).data;
        this.fillDict(stationList);
        this.findPath();
      })
      .catch((err) => console.error(err));
  }
  
  fillDict(stationList) {
    console.log('start filling dict');
    stationList.forEach(function(element) {
      element.circleLink = this.drawCircle(element.xreal,element.yreal);
      console.log(element);
      this.stationsDict[`x${element.xmatrix}y${element.ymatrix}`] = element;
  
    }, this);
    console.log('stop filling dict');
  }
  
  findPath() {
    console.log('start finding path');
    var matrix = [
      [0, 0, 0, 0]
    ];
    
    var grid = new PF.Grid(matrix);
    var finder = new PF.AStarFinder();
    var path = finder.findPath(3, 0, 0, 0, grid);
    var i=0;
    for (var i=0;i<path.length;i++) {
      if (i>0) {
        console.log(this.stationsDict[`x${path[i][0]}y${path[i][1]}`]);
        var station1 = this.stationsDict[`x${path[i-1][0]}y${path[i-1][1]}`];
        var station2 = this.stationsDict[`x${path[i][0]}y${path[i][1]}`];
        this.drawLine(station1.xreal,station1.yreal,station2.xreal,station2.yreal);
        station1.circleLink.fillColor = 'green';
        station2.circleLink.fillColor = 'green';
      };
    }

    console.log('stop finding path');
  }

  drawCircle(x,y){
    var self = this; 
    var cc = new Path.Circle({
      center: new Point(x, y),
      radius: 20,
      fillColor: 'black'
    });
    cc.onMouseDown = function(event) {
      console.log(self.stationsDict);
      this.fillColor = 'red';
    }
    return cc;
  };
  
  drawLine(x1,y1,x2,y2) {
    var from = new Point(x1, y1);
    var to = new Point(x2, y2);
    var line = new Path.Line(from, to);
    line.strokeColor = 'black';
  }

  render() {
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

export default mainMap;