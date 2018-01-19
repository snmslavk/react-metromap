import React, { Component } from 'react';
import ctrl from '../core/mainController';

class StationList extends Component {
    render() {
        var {stations,city} = this.props;
        var lineConfig = ctrl.getLineConfig(city);
        var renderTodos = () => {
            if (stations.length === 0) {
              return (
                <li className="list-group-item">Choose "From" and "To" stations</li>
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
                        return <span key={element} style={{backgroundColor: lineConfig[element].color}} className="badge">{lineConfig[element].name}</span>
                    
                    });
                } else {
                    badges=<span style={{backgroundColor: lineConfig[elem.line].color, color: 'white'}} className="badge">{lineConfig[elem.line].name}</span>;
                }
                return (
                    <li key={elem.key} className="list-group-item">
                        {elem.name}
                        {badges}
                    </li>
                );
            });
        };
          
        return (
            <ul className="list-group">
                {renderTodos()}
            </ul>
        );
    }
}

export default StationList;