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

  render() {

    return (<div className={styles.container}>
              <h1>Sanfona</h1>
              <h2>{this.props.activeSubscription}</h2>
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

              <Accordion>
                {this.state.fsEvents.map(item => {
                  return (
                    <AccordionItem title={`Item ${item.eventType}`} expanded='0'>
                    <AccordionItemTitle title={item.eventType}>
                    </AccordionItemTitle>
                      <div>
                        {`Item ${item.eventType} content`}
                      </div>
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
