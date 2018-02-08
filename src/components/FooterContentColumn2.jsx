import React, { Component } from 'react';

class FooterContentColumn2 extends Component {

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
                <h2 className="display-5">Prices</h2>
                <p className="lead">Individual fares for 1 person in Prague. All prices are in Czech Crowns</p>
                <table className="table table-striped">
                <thead>
                    <tr>
                    <th scope="col">Ticket type</th>
                    <th scope="col">Adult</th>
                    <th scope="col">Child</th>
                    <th scope="col">Senior</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <th scope="row">Basic (90min.)</th>
                    <td>32</td>
                    <td>16</td>
                    <td>16</td>
                    </tr>
                    <tr>
                    <th scope="row">Short-term (30min.)</th>
                    <td>24</td>
                    <td>12</td>
                    <td>12</td>
                    </tr>
                    <tr>
                    <th scope="row">1 day (24hrs.)</th>
                    <td>110</td>
                    <td>55</td>
                    <td>55</td>
                    </tr>
                    <tr>
                    <th scope="row">3 days (72hrs.)</th>
                    <td>310</td>
                    <td>-</td>
                    <td>-</td>
                    </tr>
                </tbody>
                </table>            
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

export default FooterContentColumn2;