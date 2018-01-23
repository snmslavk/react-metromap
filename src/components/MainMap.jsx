import React, { Component } from 'react';

import paper, {Point, Path, Raster, Layer} from 'paper';

import PF from 'pathfinding';

import ctrl from '../core/mainController';

class MainMap extends Component {
  constructor(props) {
    super(props);
    this.stationsDict = {};
    this.firstStation = '';
    this.secondStation = '';
    this.resultPath = null;
    this.animationQueue = [];
    this.raster = null;
    this.draggedX = 0;
    this.draggedY = 0;
    this.scale = 1;
    this.secondLayer = null;
    this.resetScaleProc = false;
  }

  componentDidMount() {
    let {city} = this.props;
    document.title = `${city} ${document.title}`;
    paper.setup(this.canvas);
    this.raster = new Raster('mainImage');
    let self = this;
    this.raster.on('load', function() {
      if (paper.view.bounds.size.width < 450) {
        self.draggedY+=-self.raster.bounds.size.height/3;
        self.draggedX+=-self.raster.bounds.size.width/3;
      }
      else if (paper.view.bounds.size.width < 800) {
        self.draggedY+=-paper.view.bounds.size.width/3;
        self.draggedX+=-paper.view.bounds.size.width/3;
      }

      self.secondLayer = new Layer();
      self.initMap(self.canvas);
    });
  }

  componentDidUpdate() {
    let {stationOne,stationTwo} = this.props;
    var station1 = this.findCoordStationByName(stationOne);
    var station2 = this.findCoordStationByName(stationTwo);
    if (this.firstStation !== station1 || this.secondStation !== station2) {
      this.resultPath = null;
    };
    this.firstStation = this.findCoordStationByName(stationOne);
    this.secondStation = this.findCoordStationByName(stationTwo);
    if (this.secondLayer!=null) {
      this.secondLayer.removeChildren();
      this.drawEverything();
    }
  }  

  drawEverything() {
    this.getStationInformation();
    this.findPath();
    this.drawStations();    
    this.drawPath();    
    this.drawSelection();
  }
    
  initMap(component) {
    let self = this;
    this.secondLayer.removeChildren();

    if (this.resetScaleProc === true) {
      this.raster.scale(this.scale);
      this.resetScaleProc = false;
    }

    this.raster.position = this.raster.bounds.size.divide(2);

    this.raster.position.y+=self.draggedY;
    this.raster.position.x+=self.draggedX;

    this.drawEverything();

    paper.view.onMouseUp = (event) => {
      self.raster.position = self.raster.position.add(event.delta);
      this.draggedX+=event.delta.x;
      this.draggedY+=event.delta.y;
      this.initMap(this.canvas);
    }
    paper.view.draw();
  }

  getStationInformation() {
    if (this.props.stationList.length > 0 && Object.keys(this.stationsDict).length === 0) {
      this.fillDict(this.props.stationList);
    }
  }

  drawSelection() {
    if (typeof this.stationsDict[this.firstStation] !== "undefined") {
      this.stationsDict[this.firstStation].circleLink.fillColor = '#84052f';
      this.stationsDict[this.firstStation].circleLink.opacity = 1;
    }
    if (typeof this.stationsDict[this.secondStation] !== "undefined") {
      this.stationsDict[this.secondStation].circleLink.fillColor = '#84052f';
      this.stationsDict[this.firstStation].circleLink.opacity = 1;
    }
  }

  drawStations() {
    var self = this;
    for (let prop in this.stationsDict) {
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
  }
  
  fillDict(stationList) {
    stationList.forEach(function(element) {
      var dictKey = `x${element.xmatrix}y${element.ymatrix}`;
      this.stationsDict[dictKey] = element;
  
    }, this);
  }

  findCoordStationByName(stationName) {
    for (var prop in this.stationsDict) {
      if (this.stationsDict[prop].name === stationName) {
        return prop;
      }
    }
    return '';
  }
  
  findPath() {
    if (this.firstStation === '' || this.secondStation === '') {
      return;
    }
    if (this.resultPath !== null) {
      return;
    }

    let {city} = this.props;
    var matrixPrague = ctrl.getMatrix(city);


    var grid = new PF.Grid(matrixPrague);
    var finder = new PF.AStarFinder();
    this.resultPath = finder.findPath(this.stationsDict[this.firstStation].xmatrix, this.stationsDict[this.firstStation].ymatrix, 
      this.stationsDict[this.secondStation].xmatrix, this.stationsDict[this.secondStation].ymatrix, grid);
    this.resultPath = this.resultPath.filter((elem)=>{
      return typeof this.stationsDict[`x${elem[0]}y${elem[1]}`] !== "undefined";
    });

    this.props.onPathFound(this.resultPath.map((elem)=>{
      let station = this.stationsDict[`x${elem[0]}y${elem[1]}`];
      return {key:station.name,name:station.name, line:station.line};
    }));
  }

  drawPath() {
    if (this.resultPath === null) {
      return;
    }
    for (var i=0;i<this.resultPath.length;i++) {
      if (i>0) {
        var station1 = this.stationsDict[`x${this.resultPath[i-1][0]}y${this.resultPath[i-1][1]}`];
        var station2 = this.stationsDict[`x${this.resultPath[i][0]}y${this.resultPath[i][1]}`];
        this.drawLine(station1.xreal,station1.yreal,station2.xreal,station2.yreal);
        station1.circleLink.fillColor = '#84052f';
        station2.circleLink.fillColor = '#84052f';
        station2.circleLink.opacity = 1;
        station1.circleLink.opacity = 1;
      };
    }
  }

  drawCircle(x,y){
    let self = this;
    var cc = new Path.Circle({
      center: new Point(self.draggedX+x*self.scale, self.draggedY+y*self.scale),
      radius: 11,
      fillColor: '#ffffff',
      opacity: 0
    });
    return cc;
  };
  
  drawLine(x1,y1,x2,y2) {
    x1*=this.scale;
    x2*=this.scale;
    y1*=this.scale;
    y2*=this.scale;
    x1+=this.draggedX;
    x2+=this.draggedX;
    y1+=this.draggedY;
    y2+=this.draggedY;
    var from = new Point(x1, y1);
    var to = new Point(x2, y2);
    var line = new Path.Line(from, to);
    line.strokeColor = '#84052f';
    line.strokeWidth = 7;
    return line;
  }

  handleZoomIn() {
    this.resetRasterScale();
    this.scale*=1.2;
    this.initMap(this.canvas);
  }

  handleZoomOut() {
    this.resetRasterScale();
    this.scale*=0.8;
    this.initMap(this.canvas);
  }

  resetRasterScale() {
    this.raster.scale(1/this.scale);
    this.resetScaleProc = true;
  }

  render() {
    let {city} = this.props;
    return (
      <div className="mainMap border">
        
        <button type="button" className="btn btn-dark btn-md float-right" onClick={this.handleZoomIn.bind(this)}>+</button>
        <button type="button" className="btn btn-dark  btn-md float-right" onClick={this.handleZoomOut.bind(this)}>-</button>
        <div className="float-right">You can drag and zoom the metro map.</div>
        <img alt="metro map" src={city.toLowerCase()+"_metro.svg"} id="mainImage" style={{display: 'none'}} ></img>
        <canvas id="myCanvas" ref={ ref => { this.canvas=ref; } } resize="true"></canvas>
      </div>
    );
  }
}

export default MainMap;