# electra [![Build Status](https://travis-ci.org/olegkleiman/electra.svg?branch=master)](https://travis-ci.org/olegkleiman/electra) [![GitHub issues](https://img.shields.io/github/issues/olegkleiman/electra.svg)](https://github.com/olegkleiman/electra/issues) [![Join the chat at https://gitter.im/electra_monitor](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/electra_monitor?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

**This is work in progres**. 

Scaffold for isomorphic React for ElectronJS, NodeJS and Web. It demonstrstes a basic communication (thru ipc) between Main and Rendering proccesses of Electron to pass the list of monitored directories and the monitoring events from server to UI. 
When running as Node app, it uses Server Side Rendering for the list of directories and *Firebase Realtime Db* to broadcast the monitoring events.

Native NodeJS *fs* module is used to establish initial directory watches. fb-watchman was also considered for this matter, but it seems failed to watch remote shares on Windows (at least from Windows7). No such failures were observed for MacOS, but primarily this app is intended for enterprise running on Windows. 

UI is based on [React Sanfona](https://github.com/daviferreira/react-sanfona). 

## Scaffold for React App with Electron

Scripts to build for Electron:
1. `npm run client:build`
2. `npm run client:start`
3. `npm run server:start`

Scripts to build for Web
1. `npm run client:build:web`
2. `npm run client:start:web`
3. `npm run server:start:web`

### How it works
#### Connecting to Firebase
firebase-admin npm module is used to initiallu connect to Firebase Realtime Db.
'''
import * as admin from 'firebase-admin';
...
var serviceAccount = require('./electra-fc7c5-firebase-adminsdk-f9jr0-48c9a62054.json');
var defaultApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://electra-fc7c5.firebaseio.com/'
});
var db = defaultApp.database();
'''
#### Folder watchers
Server side established folder watcher (fs.watch()) for each monitor configurtion received from Firebase:
'''
db.ref('monitors').once('value', (snap) => {
    snap.forEach( (s) => {
          fs.watch(monitor.folder,
            (eventType, fileName) => {
            });
    });
});
'''
Upon FileSystem event is callbacked, the corresponding monitor is searched:
'''
function getSubscriptionName (folderName) {

  const subscription = monitors.find( (monitor) => {
    return monitor.folder === folderName;
  });

  return subscription.subscriptionName;
}
'''
and Firebase Realtime Db is updated in the appropriate tree node:
'''
db.ref('actions/' + subscriptionName + '/' + Date.now()).set({
  fileName: _path,
  eventType: eventType,
});

'''
#### CSS Modules
For Server Side Rendering, this project uses [babel-plugin-css-modules-transform](https://github.com/michalkvasnicak/babel-plugin-css-modules-transform), like (in .babelrc)
```
    "env": {
      "server": {
          "plugins": [
            [
              "css-modules-transform", {
                "extensions": [".css", ".scss"],
                "devMode": true
              }
            ]
          ]
      }
    }

```
For client-side, it uses webpack *css-loaded* specially configured to support *modules* like:
```
{
      test: /\.css$/,
       loader: ExtractTextPlugin.extract({
            loader: 'css-loader',
            query: {
              localIdentName: '[name]__[local]___[hash:base64:5]',
              modules: true
            }
          })
    }
```
