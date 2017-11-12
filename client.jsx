import React      from 'react';
import ReactDOM   from 'react-dom';
import _ from 'lodash';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import electron from 'electron';
const ipcRenderer = electron.ipcRenderer;

import App from './app/App.jsx';

const INITIAL_STATE = {
  monitors: [],
  activeMonitorId: 0,
  lastSubscription: '',
  lastSubscriptionTime: 0
};

const reducers = (state = INITIAL_STATE, action) => {

  switch( action.type ) {
    case 'MONITORS_INIT':
      return {
          ...state,
          monitors: state.monitors.concat(action.data)
      };

    case 'ACTIVE_MONITOR': {
      return _.assign({}, state, {activeMonitorId: action.data});
    }

    case 'SUBSCRIPTION_MET': {
      return _.assign({}, state, { lastSubscription: action.data.name,
                                   lastSubscriptionTime: action.data.time });
    }

    default:
      break;

  }

  return state;

}

const store = createStore(reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ipcRenderer.on('onFolderSubscription', (event, data) => {

  const subscriptionName = data.msg.subscription;
  const _time = data.msg.time;

  console.log('Subscription ' + subscriptionName + ' satisfied');

  store.dispatch({
    type: 'SUBSCRIPTION_MET',
    data: { name: subscriptionName,
            time: _time }
  });

});

ipcRenderer.on('initStore', (event, data) => {

  console.log('Inside initStore (IPC): ' +  data.msg);

  store.dispatch({
    type: 'MONITORS_INIT',
    data: data.msg
  });

  console.log('Monitors INIT dispatched');

});

ReactDOM.render(<Provider store={store}>
                  <App />
                </Provider>,
                document.getElementById('app'));
