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
    this.animationQueue = [];
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
      this.stationsDict[this.firstStation].circleLink.fillColor = 'red';
      this.stationsDict[this.firstStation].circleLink.opacity = 1;
    }
    if (typeof this.stationsDict[this.secondStation] !== "undefined") {
      //console.log('selection2 draw');
      this.stationsDict[this.secondStation].circleLink.fillColor = 'red';
      this.stationsDict[this.firstStation].circleLink.opacity = 1;
    }
  }

  drawStations() {
    var self = this;
    //console.log('start drawing dict');
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
    var matrix = [
      [0, 0, 0, 0, 0]
    ];
    
    // var matrixPrague = [
    //   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    //   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    //   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    //   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    //   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    //   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    //   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    //   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, Nemocnice Motol(13,17), 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    //   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, Petriny(13,8), 1, Letnany(15,8), 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    //   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, Nadrazi Veleslavin(13,9), 1, Prosek(15,9), 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    //   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, Borislavka(13,10), 1, Strizkov(15,10), 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    //   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, Dejvicka(13,11), 1, Ladvi(15,11), 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    //   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, Hradcanska(13,12), 1, Kobylisy(15,12), 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    //   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, Malostranska(13,13), 1, Nadrazi Holesovice(15,13), 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    //   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, Staromestka(13,14), 1, Vltavska(15,14), 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    //   [0, Zlicin(1,15), Stodulky(2,15), Luka(3,15), Luziny(4,15), Hurka(5,15), Nove butove(6,15), Jinonice(7,15), Radilicka(8,15), Smichovske nadrazi(9,15), Andel(10,15), Karlovo Namesti(11,15), Narodni trida(12,15), Mustek(13,15), Namesti republiku(14,15), Florenc(15,15), Krizikova(16,15), Invalidovna(17,15), Palmovka(18,15), Ceskamoravska(19,15), Vysochanska(20,15), Kolbenova(21,15), Hloubetin(22,15), Rajska zahrada(23,15), Cerny most(24,15), 1, 1, 1, 1],
    //   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, X(6,13), 1, X(8,16), 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    //   [1, 1, 1, 1, 1, 1, Depo Hostivar(6,17), Skalka(7,17), Strasnicka(8,17), Zelivskeho(9,17), Flora(10,17), Jiriho z podebrad(11,17), Namesti Miru(12,17), Muzeum(13,17), X(14,17), Hlavni Nadrazi(15,17), 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    //   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, IP Pavlova(13,18), 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    //   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, Vyshehrad(13,19), 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    //   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, Prazkeho povstani(13,20), 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    //   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, Pankrac(13,21), 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    //   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, Budejovicka(13,22), 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    //   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, Kacerov(13,23), 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    //   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, Roztyly(13,24), 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    //   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, Chodov(13,25), 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    //   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, Opatov(13,26), 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    //   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, Haje(13,27), 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    // ];

    var matrixPrague = [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];

    var grid = new PF.Grid(matrixPrague);
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
        station1.circleLink.fillColor = 'blue';
        station2.circleLink.fillColor = 'blue';
        station2.circleLink.opacity = 1;
        station1.circleLink.opacity = 1;
      };
    }
    //console.log('stop draw path');
  }

  drawCircle(x,y){
    var self = this; 
    var cc = new Path.Circle({
      center: new Point(x, y),
      radius: 11,
      fillColor: '#ffffff',
      opacity: 0
    });
    return cc;
  };
  
  drawLine(x1,y1,x2,y2) {
    var from = new Point(x1, y1);
    var to = new Point(x2, y2);
    var line = new Path.Line(from, to);
    line.strokeColor = 'blue';
    line.strokeWidth = 7;
    return line;
  }

  render() {
    console.log(this.props);
    console.log(this.stationsDict);
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
        <canvas id="myCanvas" ref={ ref => { this.initMap(ref); } } resize="true"></canvas>
      </div>
    );
  }
}

export default MainMap;