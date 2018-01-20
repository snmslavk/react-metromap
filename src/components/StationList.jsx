import React, { Component } from 'react';
import ctrl from '../core/mainController';

class StationList extends Component {
    render() {
        var {stations,city} = this.props;
        var lineConfig = ctrl.getLineConfig(city);
        var renderTodos = () => {
            if (stations.length === 0) {
              return (
                <li className="list-group-item d-flex justify-content-between align-items-center"></li>
              );
            }
            //console.log('stations');
            //console.log(stations);
            return stations.map((elem) => {
                //console.log(elem);
                let badges = null;
                if (Array.isArray(elem.line)) {
                    badges = elem.line.map((element) => {
                        //console.log("MMMMM");
                        //console.log(element);
                        return <span key={element} style={{backgroundColor: lineConfig[element].color}} className="badge badge-pill">{lineConfig[element].name}</span>
                    
                    });
                } else {
                    badges=<span style={{backgroundColor: lineConfig[elem.line].color}} className="badge badge-pill">{lineConfig[elem.line].name}</span>;
                }
                return (
                    <li key={elem.key} className="list-group-item d-flex justify-content-between align-items-center">
                        {elem.name}
                        <span>{badges}</span>
                    </li>
                );
            });
        };
          
        return (
            <ul className="list-group list-group-flush">
                {renderTodos()}
            </ul>
        );
    }
}

export default StationList;