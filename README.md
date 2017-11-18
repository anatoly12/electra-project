# electra [![Build Status](https://travis-ci.org/olegkleiman/electra.svg?branch=master)](https://travis-ci.org/olegkleiman/electra) [![GitHub issues](https://img.shields.io/github/issues/olegkleiman/electra.svg)](https://github.com/olegkleiman/electra/issues) [![Join the chat at https://gitter.im/electra_monitor](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/electra_monitor?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

**This is work in progres**. 

Scaffold for isomorphic React for ElectronJS, NodeJS and Web. It demonstrstes a basic communication (thru ipc) between Main and Rendering proccesses of Electron to pass the list of monitored directories and the monitoring events from server to UI. 
When running as Node app, it uses Server Side Rendering for the list of directories and *Firebase Realtime Db* to broadcast the monitoring events.

Native NodeJS *fs* module is used to establish initial directory watches. fb-watchman was also considered for this matter, but it seems failed to watch remote shares on Windows (at least from Windows7). No such failes for MacOS, but primarily this app is intended for enterprises rinning on Windows. 

UI us based on [React Sanfona](https://github.com/daviferreira/react-sanfona)

## Scaffold for React App with Electron

Scripts to build for Electron:
1. `npm run client:build`
2. `npm run client:start`
3. `npm run server:start`

Scripts to build for Web
1. `npm run client:build:web`
2. `npm run client:start:web`
3. `npm run server:start:web`
