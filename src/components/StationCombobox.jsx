import React, { Component } from 'react';

class StationCombobox extends Component {
  // constructor(props) {
  //   super(props);
  //   var {stationName} = this.props;
  //   this.state = {value: stationName};
  // }
  handleChange(event) {
    console.log('handle change');
    //this.setState({value: event.target.value});
    this.props.onChangeSelection(event.target.value);
  }
  render() {
      var {stationName} = this.props;
      return (
        <div className="stationCombobox">
          <select onChange={this.handleChange.bind(this)} value={stationName}>
            <option value="station1">station 1</option>
            <option value="station2">station 2</option>
          </select>
          <p>{stationName}</p>
        </div>
      );
  }
}

export default StationCombobox;