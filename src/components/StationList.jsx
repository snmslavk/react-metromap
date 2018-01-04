import React, { Component } from 'react';

class StationList extends Component {
    render() {
        var {stations} = this.props;
        var renderTodos = () => {
            if (stations.length === 0) {
              return (
                <p className="container__message">there is no path</p>
              );
            }
            console.log('stations');
            console.log(stations);
            return stations.map((elem) => {
                console.log(elem);
                return (
                    <p >{elem}</p>
                );
            });
        };
          
        return (
            <div>
                {renderTodos()}
            </div>
        );
    }
}

export default StationList;