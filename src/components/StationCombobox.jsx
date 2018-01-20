import React, { Component } from 'react';

class StationCombobox extends Component {
  // constructor(props) {
  //   super(props);
  //   var {stationName} = this.props;
  //   this.state = {value: stationName};
  // }
  handleChange(event) {
    //console.log('handle change');
    //this.setState({value: event.target.value});
    //console.log(event.target.value);
    this.props.onChangeSelection(event.target.value);
  }
  render() {
      var {stationName,stationList,stationType} = this.props;
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
              <option key={element.name} value={element.name}>{element.name}</option>
            );
        });
      };
      var renderPlaceholder = () => {
        if (stationType === 'from') {
          return 'From station...';
        }
        if (stationType === 'to') {
          return 'To station...';
        }
        return '';
      }
      return (
          <select className="form-control" onChange={this.handleChange.bind(this)} value={stationName}>
            <option value=''>{renderPlaceholder()}</option>
            {renderSelect()}
          </select>
      );
  }
}

export default StationCombobox;