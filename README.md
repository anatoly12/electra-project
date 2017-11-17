# electra https://travis-ci.org/olegkleiman/electra.svg?branch=master
Directory monitor. Scaffold for isomorphic React for Electron, Node and Web. It demonstrstes a basic communication (thru ipc) between Main and Rendering proccesses of Electron to pass the list of monitored directories and the monitoring events from server to UI. 
When running as Node app, it uses Server Side Rendering for the list of directories and Firebase Realtime Db to broadcast the monitoring events.

Native Node fs module is used to establish initial directory watches. fb-watchman was also considered for this matter, but it seems failed to watch remote shares on Windows (at least from Windows7). No such failes for MacOS, but primarily this app is intended for enterprises rinning on Windows. 

## Scaffold for React App with Electron

Scripts to build for Electron:
1. `npm run client:build`
2. `npm run client:start`
3. `npm run server:start`

Scripts to build for Web
1. `npm run client:build:web`
2. `npm run client:start:web`
3. `npm run server:start:web`
