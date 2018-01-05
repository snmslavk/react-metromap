import React, { Component } from 'react';

class StationCombobox extends Component {
  // constructor(props) {
  //   super(props);
  //   var {stationName} = this.props;
  //   this.state = {value: stationName};
  // }
  handleChange(event) {
    // console.log('handle change');
    //this.setState({value: event.target.value});
    this.props.onChangeSelection(event.target.value);
  }
  render() {
      var {stationName,stationList} = this.props;
      var renderSelect = () => {
        if (stationList.length === 0) {
          return (
            <option value="Empty combobox">Empty combobox</option>
          );
        }
        // console.log('!!!stationslist!!!');
        // console.log(stationList);
        return stationList.map((element) => {
            //console.log(element);
            return (
              <option value={element.name}>{element.name}</option>
            );
        });
      };
      return (
        <div className="stationCombobox">
          <select className="form-control" onChange={this.handleChange.bind(this)} value={stationName}>
            <option value=''></option>
            {renderSelect()}
          </select>
          {/* <p>{stationName}</p> */}
        </div>
      );
  }
}

export default StationCombobox;