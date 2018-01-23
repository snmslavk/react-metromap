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
                    <ul class="list-group">
                        <li class="list-group-item list-group-item-light">Choose a map:</li>
                        <li class="list-group-item list-group-item-dark">Czech Republic</li>
                        <li class="list-group-item list-group-item-light"><a class="text-muted" href="/prague">Prague</a></li>
                        <li class="list-group-item list-group-item-dark">France</li>
                        <li class="list-group-item list-group-item-light"><a class="text-muted" href="/">Paris</a></li>
                        <li class="list-group-item list-group-item-dark">Portugal</li>
                        <li class="list-group-item list-group-item-light"><a class="text-muted" href="/">Lisbon</a></li>
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