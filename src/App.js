import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import paper, {Point} from 'paper';

import PF from 'pathfinding';

//import User from './core/station';

//var zz = new User("Вася");
//console.log(zz.name);

import User from './core/mainController';

User.getStations('/api/stations.json')
.then((html) => {
  let stationList = JSON.parse(html).data;
  console.log(stationList);
  stationList.forEach(function(element) {
    console.log(element);
    drawCircle(element.xreal,element.yreal);

  }, this);
})
.catch((err) => console.error(err));

//var stationsArray = User.Hello();
//console.log(stationsArray);
//var ff = new User();
//ff.MyFunc();

var zz2 = new Point(0,0);
console.log(zz2);

var matrix = [
  [0, 0, 0, 1, 0],
  [1, 0, 0, 0, 1],
  [0, 0, 1, 0, 0],
];
var grid = new PF.Grid(matrix);
var finder = new PF.AStarFinder();
var path = finder.findPath(1, 2, 4, 2, grid);
//console.log(path);

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
var path = new paper.Path();
// Give the stroke a color
path.strokeColor = '#ff0000';

path.strokeWidth = 10;
var start = new paper.Point(100, 100);
// Move to start and draw a line from there
path.moveTo(start);
// Note that the plus operator on Point objects does not work
// in JavaScript. Instead, we need to call the add() function:
path.lineTo(start.add([ 200, -50 ]));

path.lineTo(newPoint);

var newPoint = new paper.Point(916, 260);

function drawCircle(x,y){


var cc = new paper.Path.Circle({
  center: new paper.Point(x, y),
  radius: 25,
  fillColor: 'black'
});
};

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
      </div>
      
    );
  }
}

export default App;
