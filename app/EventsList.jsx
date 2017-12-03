import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import moment from 'moment';
import classNames from 'classnames';

import styles from '../css/eventslist.css';

// Use named export for unconnected component for jest
// export
class EventsList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      fsEvents: [],
      fsEffectiveEvents: []
    }

    this.badgeStyle = {
        float: 'right'
    }

    this.styles = {
      badgeStyle : {
        float: 'right'
      },
      fileNameStyle : {
        textAlign: 'center'
      }
    }
  }

  componentWillReceiveProps(nextProps){

    if( nextProps.activeSubscription ) {
      this.setState({
        fsEffectiveEvents: []
      });
    }

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

  handleHeaderClick = (day, e) => {
    e.preventDefault();

    let fromDate = day.clone();
    //console.log('FROM: ' + fromDate.format('LLLL'));
    let toDate = day.add(1, 'day');
    //console.log('TO: ' + toDate.format('LLLL'));

    let self = this;

    const effectiveEvents = this.state.fsEvents.filter( (fsEvent) => {
      const _watched = moment.unix(parseInt(fsEvent.watched / 1000, 10)); // without mills
      //console.log(' Watched: ' + _watched.format('LLLL'));
      return fsEvent.subscription === self.props.activeSubscription
              &&  _watched > fromDate
              && _watched < toDate;
    });

    this.setState({
      fsEffectiveEvents: effectiveEvents
    });
  }

  countEvents = (day) => {

    let fromDate = day.clone();
    let toDate = day.clone().add(1, 'day');
    let self = this;

    let _dayEvents = this.state.fsEvents.filter( (fsEvent) => {
      const _watched = moment.unix(parseInt(fsEvent.watched / 1000, 10)); // without mills
      return fsEvent.subscription === self.props.activeSubscription
              &&  _watched > fromDate
              && _watched < toDate;
    });
    return _dayEvents.length;
  }

  renderEffectiveEvents = () => {

    return this.state.fsEffectiveEvents.map( (item, i) => {

      let _watched = moment.unix( parseInt(item.watched/1000) );
      let filename = item.fileName.replace(/^.*[\\\/]/, '')

      return(<div key={i} className='row justify-content-md-center'>
              <div style={this.styles.fileNameStyle} className='col'>{filename}</div>
              <div className='col'>seen at {_watched.format('hh:mm:ss')}</div>
          </div>)
    })

  }

  render() {

    const self = this;

    var dates = [];
    const today = moment({
      hour: 0,
      minute: 0,
      seconds: 0,
      milliseconds: 0
    });

    let isActiveSubscription = this.props.activeSubscription !== '';
    if( !isActiveSubscription ) {
      return null;
    }

    let i = 1;
    dates.push(today.clone());
    while(i < 21) {
      let day = today.add(-1, 'day');
      dates.push(day.clone());  // add is a mutator method,
                                // i.e. day itself object is changed after add()
      i++;
    }

    return(<div>
              <h1>Folder monitored:</h1>
              <h2>{this.props.activeFolder}</h2>

              <div id='accordion' role='tablist' aria-multiselectable='true'>
                  {dates.map( (day, index)  => {
                                                  let eventCount = this.countEvents(day);
                                                  let badgeClass = classNames('badge-pill', {
                                                    'badge-primary': eventCount > 0,
                                                    'badge-danger': eventCount == 0
                                                  });
                                                  return (<div className='card' key={index}>
                                                            <div className='card-header' role='tab' id={'heading'+index}
                                                                  onClick={ e => this.handleHeaderClick(day, e) }>
                                                                  <h5 className='mb-0'>
                                                                    <a data-toggle='collapse' data-parent='#accordion'
                                                                      href={'#u' + index.toString()} aria-expanded='false'>
                                                                        {day.format('DD.MM.YYYY')}
                                                                        <span style={this.styles.badgeStyle}
                                                                              className={badgeClass}>{this.countEvents(day)}
                                                                        </span>
                                                                    </a>
                                                                  </h5>
                                                            </div>

                                                            <div id={'u' + index} className='collapse hide'
                                                                  role='tabpanel'
                                                                  aria-labelledby={'heading'+index}>
                                                                  <div className='card-block'>
                                                                      {this.renderEffectiveEvents()}
                                                                  </div>
                                                            </div>

                                                          </div>
                                                          )
                                                })
                  };
              </div>
           </div>)
  }
};

const mapStateToProps = state => {

  return {
    fsEvent: state.fsEvent,
    activeSubscription: state.activeSubscription,
    activeFolder: state.activeFolder
  };
};

export default connect(mapStateToProps)(EventsList);
