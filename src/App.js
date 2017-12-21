import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import paper, {Point} from 'paper';

import PF from 'pathfinding';

//import User from './core/station';

//var zz = new User("Вася");
//console.log(zz.name);

import User from './core/mainController';

var stationsDict = {};

User.getStations('/api/stations.json')
.then((html) => {
  let stationList = JSON.parse(html).data;
  //console.log(stationList);
  fillDict(stationList);
  findPath();
})
.catch((err) => console.error(err));

function fillDict(stationList) {
  stationList.forEach(function(element) {
    console.log(element);
    drawCircle(element.xreal,element.yreal);
    stationsDict[`x${element.xmatrix}y${element.ymatrix}`] = element;

  }, this);
}

function findPath() {
  console.log('start finding path');
  var matrix = [
    [0, 0, 0, 0]
  ];
  
  var grid = new PF.Grid(matrix);
  var finder = new PF.AStarFinder();
  //console.log('path result start');
  // координаты откуда куда x, y
  var path = finder.findPath(3, 0, 0, 0, grid);
  //console.log(path);
  //console.log(stationsDict);
  var i=0;
  path.forEach(function(element) {
    if (i>0) {
      console.log(stationsDict[`x${element[0]}y${element[1]}`]);
      var station1 = stationsDict[`x${path[i-1][0]}y${path[i-1][1]}`];
      var station2 = stationsDict[`x${element[0]}y${element[1]}`];
      //drawCircle(element.xreal,element.yreal);
      //stationsDict[`x${element.xmatrix}y${element.ymatrix}`];
      drawLine(station1.xreal,station1.yreal,station2.xreal,station2.yreal);
    };
    i++;
  });
  console.log('stop finding path');
}

//var stationsArray = User.Hello();
//console.log(stationsArray);
//var ff = new User();
//ff.MyFunc();

// var zz2 = new Point(0,0);
// console.log(zz2);

// var matrix = [
//   [0, 0, 0, 1, 0],
//   [1, 0, 0, 0, 1],
//   [0, 0, 1, 0, 0],
// ];




var canvas = document.getElementById('myCanvas');
// Create an empty project and a view for the canvas:
paper.setup(canvas);

var raster = new paper.Raster('mainImage');

raster.on('load', function() {
  this.position = this.size.divide(2);
});

// Move the raster to the center of the view
// raster.position = new paper.Point(150, 120);

// console.log(paper.view.bounds.bottomLeft);
// console.log(paper.view.bounds.bottomRight);
// console.log(paper.view.bounds.topLeft);
// console.log(paper.view.bounds.topRight);

//raster.size = paper.view.viewSize;
// Create a Paper.js Path to draw a line into it:
// var path = new paper.Path();
// // Give the stroke a color
// path.strokeColor = '#ff0000';

// path.strokeWidth = 10;
// var start = new paper.Point(100, 100);
// // Move to start and draw a line from there
// path.moveTo(start);
// // Note that the plus operator on Point objects does not work
// // in JavaScript. Instead, we need to call the add() function:
// path.lineTo(start.add([ 200, -50 ]));

// path.lineTo(newPoint);

// var newPoint = new paper.Point(916, 260);

function drawCircle(x,y){
  var cc = new paper.Path.Circle({
    center: new paper.Point(x, y),
    radius: 20,
    fillColor: 'black'
  });
  cc.onMouseDown = function(event) {
    this.fillColor = 'red';
  }
};

function drawLine(x1,y1,x2,y2) {
  var from = new paper.Point(x1, y1);
  var to = new paper.Point(x2, y2);
  var line = new paper.Path.Line(from, to);
  line.strokeColor = 'black';
}

// When the mouse is pressed on the item,
// set its fill color to red:
// cc.onMouseDown = function(event) {
//   this.fillColor = 'red';
// }
// myCircle.fillColor = 'black';

// When the mouse is clicked on the item,
// set its fill color to red:
// myCircle.onClick = function(event) {
//   this.fillColor = 'red';
// }

// Draw the view now:
paper.view.draw();

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <header className="App-header">
           <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1> 
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p> */}
        <div class="container-fluid">
          <div class="row">
              <div class="col-sm-1"></div>
              <div class="col-sm-10"><canvas id="myCanvas" resize></canvas></div>
              <div class="col-sm-1"></div>
            </div>
        </div>
      </div>
    );
  }
}

export default App;
