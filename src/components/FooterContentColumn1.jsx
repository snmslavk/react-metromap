import React, { Component } from 'react';

class FooterContentColumn1 extends Component {

    GetCityInfo(city) {
        switch (city) {
            case 'Prague':
              return this.GetPragueInfo();
            case 'Lisbon':
              return null;
            default:
              return null;
        }
    }

    GetPragueInfo() {
        return (
            <div>
                <h2 className="display-5">General information</h2>
                <p className="lead">This is interactive online metro(underground) map of Prague.It allows you to easily find the needed route between stations. Even though the scheme of the prague metro map is not too complex and contains only 3 main line, we hope that this website with prague metro map would be useful for you in the future. Please don’t forget that Prague metro openings hours: 5:00am - 12:00pm. The average time that it requires to reach one station from another is about 2 minutes. During working hours prague metro has 2-3 minutes interval between trains, but during weekends and public holidays it could be up to 10 minutes, because of that be carefull with prague online metro map and plan your trip in advance. Prague online metro map has 3 lines: Line A (color green), Line B (color yellow) and Line C (color red). If you want to switch between lines during your trip within prague metro you can use three key transfer station: Muzeum (red-green), Mustek(yellow-green), Florenc(yellow-red).</p>
            </div>
        );
    }

    render() {
        let {city} = this.props;
        return (
                this.GetCityInfo(city)
        );
    }
}

export default FooterContentColumn1;