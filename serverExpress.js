import express from 'express';
import path from 'path';
import React            from 'react';
import ReactDomServer   from 'react-dom/server';
import { createStore }  from 'redux';
import { Provider }     from 'react-redux';

import _ from 'lodash';
import moment from 'moment';
import fs from 'fs';

import reducers         from './reducers.jsx';
import template         from './template.js';

import App from './app/App.jsx';

import * as admin from 'firebase-admin';
var serviceAccount = require('./electra-fc7c5-firebase-adminsdk-f9jr0-48c9a62054.json');

var defaultApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://electra-fc7c5.firebaseio.com/'
});
console.log('Connected to Fibase App ' + defaultApp.name);
var db = defaultApp.database().ref();

const monitors = [];

let checkFileExists = path => new Promise( resolve => fs.access(path, fs.F_OK, err => resolve(!err)) );

// Establis file watcher for each monitor found in Firebase
db.child('monitors').once('value', (snap) => {
  let _val = snap.val();
  console.log(_val);
  snap.forEach( (s) => {
    let monitor = s.val();

    console.log('Folder: ' + monitor.folder);

    // Assume 0 as default notifications number
    monitors.push(_.assign({}, monitor, { notifications: 0}));

    checkFileExists(monitor.folder)
    .then( isExists => {
      console.log(monitor.folder + ' is exists ' + isExists);

      fs.watch(monitor.folder,
        (eventType, fileName) => {
          var _day = moment().format("DD-MM-YYYY");
          console.log(`${_day} EventType: ${eventType}. FileName: ${fileName}`);

          if( fileName ) {
            const _path = monitor.folder + '/'  + fileName;

            checkFileExists(_path)
            .then(
               isExists => {
                          if( isExists ) {
                            console.log(` ${_path} is reported to client`);
                            const subscriptionName = getSubscriptionName(monitor.folder);

                            db.ref('actions/' + subscriptionName + '/' + Date.now()).set({
                              fileName: _path,
                              eventType: eventType,
                            });

                          } else {
                            console.log('Report to client skipped');
                          }
                        }
            );
        }
        });

    })


  })

});

function initMonitors(monitors) {
  return {
    type: 'MONITORS_INIT',
    data: monitors
  }
};

function getSubscriptionName (folderName) {
  for(let i = 0; i < monitors.length; i++) {
    if( monitors[i].folder == folderName ) {
      return monitors[i].subscriptionName;
    }
  }

  return '';
}

const app = express();

app.get('/', (req, res) => {

  const store = createStore(reducers);
  store.dispatch(initMonitors(monitors));
  const preloadedState = store.getState();

  const componentHTML = ReactDomServer.renderToString(<Provider store={store}>
                                                          <App />
                                                      </Provider>);
  const html = template({
    content: componentHTML,
    state: preloadedState});

  res.status(200).send(html);
});

app.listen(3000, () => {
  console.log('Server listens to port 3000');
})
