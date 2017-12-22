import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import paper, {Point} from 'paper';

import PF from 'pathfinding';

import User from './core/mainController';

class App extends Component {
  stationsDict = {};

  initMap(component) {
    paper.setup(component);

    var raster = new paper.Raster('mainImage');

    raster.on('load', function() {
      this.position = this.size.divide(2);
    });

    this.getInformationAndDraw();

    paper.view.draw();
  }

  getInformationAndDraw() {
    User.getStations('/api/stations.json')
      .then((html) => {
        let stationList = JSON.parse(html).data;
        this.fillDict(stationList);
        this.findPath();
      })
      .catch((err) => console.error(err));
  }
  
  fillDict(stationList) {
    stationList.forEach(function(element) {
      console.log(element);
      this.drawCircle(element.xreal,element.yreal);
      this.stationsDict[`x${element.xmatrix}y${element.ymatrix}`] = element;
  
    }, this);
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
      };
    }

    console.log('stop finding path');
  }

  drawCircle(x,y){
    var cc = new paper.Path.Circle({
      center: new paper.Point(x, y),
      radius: 20,
      fillColor: 'black'
    });
    cc.onMouseDown = function(event) {
      this.fillColor = 'red';
    }
  };
  
  drawLine(x1,y1,x2,y2) {
    var from = new paper.Point(x1, y1);
    var to = new paper.Point(x2, y2);
    var line = new paper.Path.Line(from, to);
    line.strokeColor = 'black';
  }

  render() {
    return (
      <div className="App">
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

// как взаимодействовать с DOM компонента
// https://stackoverflow.com/questions/32171718/unable-to-manipulate-the-dom-in-a-react-component
// https://stackoverflow.com/questions/38093760/how-to-access-a-dom-element-in-react-what-is-the-equilvalent-of-document-getele
export default App;
