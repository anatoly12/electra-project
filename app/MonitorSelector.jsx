import React from 'react';
import { connect } from 'react-redux';
import { Dropdown, DropdownItem } from 'muicss/react';

class MonitorSelector extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      activeSubscription: 'select monitor'
    };

    this.onMonitorSelected = this.onMonitorSelected.bind(this);
  }

  onMonitorSelected(e) {

    //e.preventDefault();
    const index = parseInt(e, 10);
    const _monitor = this.props.monitors[index];

    this.setState({
      activeSubscription: _monitor.subscriptionName
    })

    this.props.dispatch({
      type: 'ACTIVE_MONITOR',
      data: {
        subscriptionName: _monitor.subscriptionName,
        folderName: _monitor.folder
      }
    })
  }

  render() {
    return (<Dropdown color='primary' label={this.state.activeSubscription}
                      onSelect={this.onMonitorSelected}>
              { this.props.monitors.map( (monitor, index) => {
                  return <DropdownItem key={index} value={index}>
                    {monitor.subscriptionName}
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
