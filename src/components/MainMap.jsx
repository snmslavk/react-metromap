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
    //console.log('mount!');
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

  drawEverything() {
    this.getStationInformation();
    this.findPath();
    this.drawStations();    
    this.drawPath();    
    this.drawSelection();
  }
    
  initMap(component) {
    //paper.setup(component);
    // console.log('scale');
    // console.log(this.scale)
    let self = this;
    //this.raster = new Raster('mainImage');
    //paper.project.activeLayer.removeChildren();
    this.secondLayer.removeChildren();
    //this.secondLayer = new Layer();
    // this.raster.on('load', function() {
    //  console.log("paper view");
    //  console.log(paper.view.bounds.size);
    //   this.scale(self.scale);
    //   //if (self.draggedX === 0 && self.draggedY === 0) {
    //     this.position = this.bounds.size.divide(2);//paper.view.bounds.size.divide(2);
    //     //this.position.x.add(this.draggedX);
    //     //this.position.y.add(this.draggedY);
    //     this.position.y+=self.draggedY;
    //     this.position.x+=self.draggedX;
    //     console.log(this.bounds);
    //   //}
    // });
    //this.raster.reset();
    if (this.resetScaleProc === true) {
      this.raster.scale(this.scale);
      this.resetScaleProc = false;
    }

    this.raster.position = this.raster.bounds.size.divide(2);//paper.view.bounds.size.divide(2);

    this.raster.position.y+=self.draggedY;
    this.raster.position.x+=self.draggedX;

    // this.raster.position.y+=-this.raster.bounds.size.height/3;
    // this.raster.position.x+=-this.raster.bounds.size.width/3;
    // if (this.props.stationList.length > 0) {
    //   this.getInformationAndDraw();
    //   console.log('draw first');
    //   // this.drawCircle(100,100);
    // }

    this.drawEverything();

    // let path = new Path();
    // // Give the stroke a color
    // path.strokeColor = 'black';
    // path.add(new Point(100, 100));
    // path.add(new Point(100, 100));

    // paper.view.onFrame = (event) => {
    //   //for (var i = 0; i <= 2; i++) {
    //   //  var segment = path.segments[0];
    
    //     // A cylic value between -1 and 1
    //   //  var sinus = Math.sin(event.time * 3 + 0);
        
    //     // Change the y position of the segment point:
    //   //  segment.point.y = sinus * 60 + 100;
    //   //}
    //   //console.log(event.time);
    //   //if (event.count % 2 === 0) {
    //     var segment = path.segments[0];
    //     if (segment.point.y<500) {
    //       segment.point.y+=1;
    //     }
    //     //console.log(event.time);
    //   //}
    // }

    paper.view.onMouseUp = (event) => {
      self.raster.position = self.raster.position.add(event.delta);
      //console.log('delta');
      //console.log(event.delta);
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
    //console.log('selection draw');
    //console.log(this.firstStation);
    if (typeof this.stationsDict[this.firstStation] !== "undefined") {
      //console.log('selection1 draw');
      this.stationsDict[this.firstStation].circleLink.fillColor = '#84052f';
      this.stationsDict[this.firstStation].circleLink.opacity = 1;
    }
    if (typeof this.stationsDict[this.secondStation] !== "undefined") {
      //console.log('selection2 draw');
      this.stationsDict[this.secondStation].circleLink.fillColor = '#84052f';
      this.stationsDict[this.firstStation].circleLink.opacity = 1;
    }
  }

  drawStations() {
    var self = this;
    // console.log('start drawing dict');
    for (let prop in this.stationsDict) {
      //console.log("obj." + prop + " = " + this.stationsDict[prop]);
      
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

        // console.log('first=');
        // console.log(self.firstStation);
        // console.log('second=');
        // console.log(self.secondStation);

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
    // console.log('stop drawing dict');
  }
  
  fillDict(stationList) {
    //console.log('start filling dict');
    stationList.forEach(function(element) {
      var dictKey = `x${element.xmatrix}y${element.ymatrix}`;
      this.stationsDict[dictKey] = element;
  
    }, this);
    //console.log('stop filling dict');
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
    // console.log('start finding path');
    if (this.firstStation === '' || this.secondStation === '') {
      // console.log('return');
      return;
    }
    if (this.resultPath !== null) {
      // console.log(this.resultPath);
      // console.log('return');
      return;
    }
    
    // var matrixPrague1 = [
    //   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    //   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    //   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    //   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    //   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    //   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    //   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    //   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    //   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    //   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    //   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    //   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    //   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    //   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    //   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
    //   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    //   [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    //   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    //   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    //   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    //   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    //   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    //   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    //   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    //   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    //   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    //   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    // ];

    let {city} = this.props;
    var matrixPrague = ctrl.getMatrix(city);


    var grid = new PF.Grid(matrixPrague);
    var finder = new PF.AStarFinder();
    //var path = finder.findPath(3, 0, 0, 0, grid);
    this.resultPath = finder.findPath(this.stationsDict[this.firstStation].xmatrix, this.stationsDict[this.firstStation].ymatrix, 
      this.stationsDict[this.secondStation].xmatrix, this.stationsDict[this.secondStation].ymatrix, grid);
    //console.log('path=');
    this.resultPath = this.resultPath.filter((elem)=>{
      return typeof this.stationsDict[`x${elem[0]}y${elem[1]}`] !== "undefined";
    });

    //console.log(this.resultPath);
    this.props.onPathFound(this.resultPath.map((elem)=>{
      let station = this.stationsDict[`x${elem[0]}y${elem[1]}`];
      return {key:station.name,name:station.name, line:station.line};
      //return station.name;
    }));
    // console.log('stop finding path');
  }

  drawPath() {
    //console.log('start draw path');
    if (this.resultPath === null) {
      return;
    }
    for (var i=0;i<this.resultPath.length;i++) {
      if (i>0) {
        //console.log(this.stationsDict[`x${this.resultPath[i][0]}y${this.resultPath[i][1]}`]);
        var station1 = this.stationsDict[`x${this.resultPath[i-1][0]}y${this.resultPath[i-1][1]}`];
        var station2 = this.stationsDict[`x${this.resultPath[i][0]}y${this.resultPath[i][1]}`];
        this.drawLine(station1.xreal,station1.yreal,station2.xreal,station2.yreal);
        station1.circleLink.fillColor = '#84052f';
        station2.circleLink.fillColor = '#84052f';
        station2.circleLink.opacity = 1;
        station1.circleLink.opacity = 1;
      };
    }
    //console.log('stop draw path');
  }

  drawCircle(x,y){
    let self = this;
    var cc = new Path.Circle({
      center: new Point(self.draggedX+x*self.scale, self.draggedY+y*self.scale),
      radius: 11,
      //fillColor: 'black'
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
    //this.raster.scale(1.2);
    this.resetRasterScale();
    this.scale*=1.2;
    this.initMap(this.canvas);
  }

  handleZoomOut() {
    //this.raster.scale(0.8);
    this.resetRasterScale();
    this.scale*=0.8;
    this.initMap(this.canvas);
  }

  resetRasterScale() {
    this.raster.scale(1/this.scale);
    this.resetScaleProc = true;
  }

  componentDidUpdate() {
    //console.log("will update");
    //console.log(this.props);
    //console.log(this.stationsDict);
    let {stationOne,stationTwo} = this.props;
    var station1 = this.findCoordStationByName(stationOne);
    var station2 = this.findCoordStationByName(stationTwo);
    if (this.firstStation !== station1 || this.secondStation !== station2) {
      this.resultPath = null;
    };
    this.firstStation = this.findCoordStationByName(stationOne);
    this.secondStation = this.findCoordStationByName(stationTwo);
    //this.initMap(this.canvas);
    if (this.secondLayer!=null) {
      this.secondLayer.removeChildren();
      this.drawEverything();
    }
    // this.findPath();
    // this.drawPath();    
    // this.drawSelection();
  }

  render() {
    //console.log("render");
    let {city} = this.props;
    return (
      <div className="mainMap border">
        
        <button type="button" className="btn btn-dark btn-md float-right" onClick={this.handleZoomIn.bind(this)}>+</button>
        <button type="button" className="btn btn-dark  btn-md float-right" onClick={this.handleZoomOut.bind(this)}>-</button>
        <div className="float-right">You can drag and zoom the metro map.</div>
        <img alt="metro map" src={city.toLowerCase()+"_metro.svg"} id="mainImage" style={{display: 'none'}} ></img>
        {/* <canvas id="myCanvas" ref={ ref => { this.initMap(ref); } } resize="true"></canvas> */}
        <canvas id="myCanvas" ref={ ref => { this.canvas=ref; } } resize="true"></canvas>
      </div>
    );
  }
}

export default MainMap;