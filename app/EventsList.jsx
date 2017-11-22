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
    if( nextProps.fsEvent ) {

      const fsEvent = nextProps.fsEvent;

      this.setState( prevState => ({
        fsEvents: [...this.state.fsEvents, {
                        eventType: fsEvent.eventType,
                        fileName: fsEvent.fileName,
                        watched: fsEvent.watched,
                        subscription: fsEvent.subscription
                      }
                  ]
      }))
    }
  }

  render() {

    const self = this;

    return (<div className={styles.container}>
              <h1>Sanfona</h1>
              <h2>{this.props.activeSubscription}</h2>

              <Accordion>
                {this.state.fsEvents.map(fsEvent => {

                  if( fsEvent.subscription != self.props.activeSubscription )
                    return null;

                  const _watched = moment(parseInt(fsEvent.watched, 10))
                                  .format('DD.MM.YYYY');

                  return (
                    <AccordionItem title={_watched} expanded='0'>
                        <AccordionItemTitle title={fsEvent.fileName}>
                        </AccordionItemTitle>
                        <AccordionItemBody>
                          <div>
                            {fsEvent.eventType}
                          </div>
                          </AccordionItemBody>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </div>)
  }

};

const mapStateToProps = state => {

  return {
    fsEvent: state.fsEvent,
    activeSubscription: state.activeSubscription,
    fsEventSubscription: state.fsEventSubscription,
  };
};

export default connect(mapStateToProps)(EventsList);
