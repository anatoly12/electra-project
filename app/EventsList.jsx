import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { Accordion, AccordionItem } from 'react-sanfona';

import styles from '../css/eventslist.css';

// Use named export for unconnected component for jest
//export
class EventsList extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps){
    if( nextProps.fsEvent &&
        nextProps.fsEventSubscription) {

      const currentMonitor = this.props.monitors.find( (monitor) => {
        return monitor.subscriptionName === nextProps.fsEventSubscription
      });

      if( currentMonitor )
        currentMonitor.notifications++;

    }
  }

  componentWillUpdate(nextProps, nextState) {
    if( nextProps.lastSubscription === '' ) {
      return false;
    } else {
        this.props.monitors.forEach( (monitor, index) => {
          if( monitor.subscriptionName === nextProps.lastSubscription )
              this.props.monitors[index].notifications++;
        });

        return true;
    }
  }

  render() {

    return (<div className={styles.container}>
              <h1>Sanfona</h1>
              <Accordion>
                <AccordionItem className='accordion_item' title='25.10.2017'>
                  <h2>One</h2>
                </AccordionItem>
                <AccordionItem className='accordion_item' title='26.10.2017'>
                  Two
                </AccordionItem>
              </Accordion>
            </div>)
  }

};

const mapStateToProps = state => {

  return {
    fsEvent: state.fsEvent,
    fsEventSubscription: state.fsEventSubscription,
    monitors: state.monitors,
    lastSubscription: state.lastSubscription,
    lastSubscriptionTime: state.lastSubscriptionTime
  };
};

export default connect(mapStateToProps)(EventsList);
