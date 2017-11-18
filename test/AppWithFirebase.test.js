import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import * as admin from 'firebase-admin';
var serviceAccount = require('../electra-fc7c5-firebase-adminsdk-f9jr0-48c9a62054.json');

import reducers from '../reducers.jsx';
import App from '../app/App.jsx';

test('Test App component', () => {

  var defaultApp = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://electra-fc7c5.firebaseio.com/'
  });
  console.log('Connected to Fibase App ' + defaultApp.name);
  var db = defaultApp.database();

  const monitors = [];
  db.ref('monitors').once('value', (snap) => {

    let _val = snap.val();
    console.log(_val);

    snap.forEach( (s) => {
      let monitor = s.val();
      monitors.push(_.assign({}, monitor, { notifications: 0}));
    });

    store.dispatch(initMonitors(monitors));

  });

  const store = createStore(reducers);

  const component = renderer.create(<Provider store={store}>
                                      <App />
                                    </Provider>);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
