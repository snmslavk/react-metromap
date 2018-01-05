import React, { Component } from 'react';
import ctrl from '../core/mainController';

class StationList extends Component {
    render() {
        var lineConfig = ctrl.getLineConfig();
        var {stations} = this.props;
        var renderTodos = () => {
            if (stations.length === 0) {
              return (
                <li className="list-group-item">there is no path</li>
              );
            }
            console.log('stations');
            console.log(stations);
            return stations.map((elem) => {
                console.log(elem);
                let badges = null;
                if (Array.isArray(elem.line)) {
                    badges = elem.line.map((element) => {
                        console.log("MMMMM");
                        console.log(element);
                        return <span style={{backgroundColor: lineConfig[element].color}} className="badge">{lineConfig[element].name}</span>
                    
                    });
                } else {
                    badges=<span style={{backgroundColor: lineConfig[elem.line].color}} className="badge">{lineConfig[elem.line].name}</span>;
                }
                return (
                    <li className="list-group-item">
                        {badges}
                        {elem.name}
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