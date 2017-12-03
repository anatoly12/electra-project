// @flow
import React from 'react';
import ReactDom from "react-dom";

import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {GridList, GridTile} from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
import AppBar from "material-ui/AppBar";
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import Header from './Header.jsx';
import MonitorsList from './MonitorsList.jsx';
import ActiveMonitor from './ActiveMonitor.jsx';
import MonitorSelector from './MonitorSelector.jsx';
import EventsList from './EventsList.jsx';

import styles from '../css/sanfona.css'

import classNames from 'classnames';

// import electron from 'electron';
// const ipcRenderer = electron.ipcRenderer;

/*const style = {
  marginRight: 20,
};*/

class App extends React.Component {

  constructor() {
    super();

  }

  componentDidCatch(error, info) {

    console.error(error);
  }


  fabClick = (event: object) => {

    ipcRenderer.send('async-message', 'FAB');

    //event.preventDefault()
  }

  render() {

    let titleStyle = styles.sanfonaTitle;
    let mainTitleClass = classNames('row', titleStyle);

    return (<div>
              <span className={mainTitleClass}>
                  <h1 className='col'>Electra Monitor</h1>
                  <div className='col align-middle align-items-center'>
                    <MonitorSelector />
                  </div>
              </span>

              <EventsList />
            </div>);
  }

};

export default App;
