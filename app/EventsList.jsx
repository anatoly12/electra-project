import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { Accordion,
         AccordionItem,
         AccordionItemBody,
         AccordionItemTitle } from 'react-sanfona';

import moment from 'moment';

import styles from '../css/eventslist.css';

// Use named export for unconnected component for jest
//export
class EventsList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      fsEvents: []
    }
  }

  componentWillReceiveProps(nextProps){
    if( nextProps.fsEvent &&
        nextProps.fsEventSubscription) {

      const currentMonitor = this.props.monitors.find( (monitor) => {
        return monitor.subscriptionName === nextProps.fsEventSubscription
      });

      if( currentMonitor )
        currentMonitor.notifications++;

      this.setState( prevState => ({
        fsEvents: [...this.state.fsEvents, {
                        eventType: nextProps.fsEvent.eventType,
                        fileName: nextProps.fsEvent.fileName,
                        watched: nextProps.fsEvent.watched
                      }
                  ]
      }))
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
              {this.state.fsEvents.map( (fsEvent, index) => {

                  const _watched = moment(parseInt(fsEvent.watched, 10))
                                  .format('DD.MM.YYYY');

                  return <div key={index}>
                            <div>{fsEvent.fileName}</div>
                            <div>{fsEvent.eventType}</div>
                            <div>{_watched}</div>
                          </div>
              }
              )}

              <Accordion>
              <AccordionItem className='accordion_item'
                             title='25.10.2017'>
                        <AccordionItemTitle title='One title'>
                        </AccordionItemTitle>
                        <AccordionItemBody>
                          One
                        </AccordionItemBody>
              </AccordionItem>
                <AccordionItem className='accordion_item' title='26.10.2017'>
                  <h2>Two</h2>
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
