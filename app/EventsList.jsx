import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { Accordion, AccordionItem } from 'react-sanfona';

import styles from '../css/eventslist.css';

class EventsList extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (<div className={styles.container}>
              <Accordion>
                <AccordionItem className='accordion_item' title='25.10.2017'>
                  One
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
