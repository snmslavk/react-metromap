import React, { Component } from 'react';
import ctrl from '../core/mainController';

class StationList extends Component {
    render() {
        var {stations,city} = this.props;
        var lineConfig = ctrl.getLineConfig(city);
        var renderTodos = () => {
            if (stations.length === 0) {
              return (
                <li className="list-group-item">
                    <ul className="list-group">
                        <li className="list-group-item list-group-item-light">Choose a map:</li>
                        <li className="list-group-item list-group-item-light"><a className="text-muted" href="/prague">Prague</a></li>
                        <li className="list-group-item list-group-item-light"><a className="text-muted" href="/paris">Paris</a></li>
                        <li className="list-group-item list-group-item-light"><a className="text-muted" href="/lisbon">Lisbon</a></li>
                        <li className="list-group-item list-group-item-light"><a className="text-muted" href="/amsterdam">Amsterdam</a></li>
                    </ul>
                </li>
              );
            }
            return stations.map((elem) => {
                let badges = null;
                if (Array.isArray(elem.line)) {
                    badges = elem.line.map((element) => {
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