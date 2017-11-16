import React      from 'react';
import ReactDOM   from 'react-dom';
import _ from 'lodash';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import firebase from 'firebase';

import reducers from './reducers.jsx';
import App from './app/App.jsx';

var config = {
  databaseURL: 'https://electra-fc7c5.firebaseio.com/',
};
var defaultApp = firebase.initializeApp(config);
var db = defaultApp.database();

var refSubs = db.ref('subs');

const store = createStore(reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

// Grab the state from a global variable injected into the server-generated code
const preloadedState = window.__PRELOADED_STATE__;
if( preloadedState ) {
      const monitors = preloadedState.monitors;

      delete window.__PRELOADED_STATE__;

      store.dispatch({
          type: 'MONITORS_INIT',
          data: monitors
      });

}

ReactDOM.hydrate(<Provider store={store}>
                  <App fbRef={refSubs}/>
                </Provider>,
                document.getElementById('app'));
