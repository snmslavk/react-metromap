import React, { Component } from 'react';

class FooterContentColumn2 extends Component {

    GetCityInfo(city) {
        switch (city) {
            case 'Prague':
              return this.GetPragueInfo();
            case 'Amsterdam':
              return this.GetAmsterdamInfo();              
            case 'Lisbon':
              return null;
            default:
              return null;
        }
    }

    GetAmsterdamInfo() {
        return (
            <div>
                <h2 className="display-5">Amsterdam public transport fares 2018</h2>
                <p className="lead">Reduced prices for people 65 years and older. Also it's aplicable for children under 18 years old.</p>
                <table className="table table-striped">
                <thead>
                    <tr>
                    <th scope="col">Ticket type</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <th scope="row">E-purse (traveling on a balance)</th>
                    <td>full rate € 0.155 per km</td>
                    <td>full rate € 0.90</td>
                    <td>reduced rate € 0.102 per km</td>
                    <td>reduced rate € 0.59</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    </tr>
                    <tr>
                    <th scope="row">Hour tickets / Day tickets</th>
                    <td>GVB 1 hour € 3.00</td>
                    <td>GVB 1 day / 24 hours € 7.50</td>
                    <td>GVB child 1 day / 24 hours € 3.75</td>
                    <td>GVB 2 days / 48 hours € 12.50</td>
                    <td>GVB 3 days / 72 hours € 17.50</td>
                    <td>GVB 4 days / 96 hours € 22.50</td>
                    <td>GVB 5 days / 120 hours € 27.50</td>
                    <td>GVB 6 days / 144 hours € 31.50</td>
                    <td>GVB 7 days / 168 hours € 34.50</td>
                    </tr>
                    <tr>
                    <th scope="row">Bicycle tickets</th>
                    <td>GVB 1 hour bicycle € 4.70</td>
                    <td>Bicycle supplement (1 day validity) € 1.70</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    </tr>
                    <tr>
                    <th scope="row">Night bus</th>
                    <td>GVB 1 trip € 4.50</td>
                    <td>GVB 12 trips € 34.00</td>
                    <td>Night network greater A'dam € 8.00</td>
                    </tr>
                </tbody>
                </table>            
            </div>
        );
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