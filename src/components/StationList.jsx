import React, { Component } from 'react';

class StationList extends Component {
    render() {
        var {stations} = this.props;
        var renderTodos = () => {
            if (stations.length === 0) {
              return (
                <p className="container__message">Nothing To Do</p>
              );
            }
            console.log('stations');
            console.log(stations);
            return stations.map((todo) => {
                console.log(todo);
                return (
                    <p >{todo}</p>
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