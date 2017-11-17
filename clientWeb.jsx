import React      from 'react';
import ReactDOM   from 'react-dom';
import _ from 'lodash';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import firebase from 'firebase';

import reducers from './reducers.jsx';
import App from './app/App.jsx';


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

var config = {
  apiKey: 'AIzaSyBpOJXFoIcXOi-WV5OpUV5Pr5FeRQ1eoiI',
  databaseURL: 'https://electra-fc7c5.firebaseio.com/',
};
var defaultApp = firebase.initializeApp(config);
var dbRef = defaultApp.database().ref();

var Subs = dbRef.child('actions');

// Enumerate subscriptions for 'actions' root - only once!
Subs.once('value', (snap) => {

    snap.forEach( (item) => {

      console.log('Subscription enumerated: ' + item.key);

      // For each subscription found, establish listener for added actions
      Subs.child(item.key).on('child_added', (s) => {

          let _val = s.val();
          console.log('Action reported for ' + item.key + ':');
          console.log(_val);

          store.dispatch({
            type: 'FS_EVENT',
            data: {
                    fsEvent: _val,
                    subscription: item.key
                  }
          });

      });

    });

});

ReactDOM.hydrate(<Provider store={store}>
                  <App />
                </Provider>,
                document.getElementById('app'));
