import React from 'react';
import { connect } from 'react-redux';
import { Dropdown } from 'muicss/react'

class MonitorSelector extends React.Component {

  constructor(props) {
    super(props);
  }

  onMonitorSelected = (e) => {
    e.preventDefault();
  }

  render() {
    return (<Dropdown color='primary' lalbel='select monitor'
                      onSelect={this.onMonitorSelected}>
              { this.props.monitors.map( (monitor, index) => {
                  return <DropdownItem key={index}>
                    sss
                  </DropdownItem>
                })
              }
            </Dropdown>);
  }

};

const mapStateToProps = state => {

  return {
    monitors: state.monitors,
  };
};

export default connect(mapStateToProps)(MonitorSelector);
