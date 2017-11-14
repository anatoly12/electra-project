/*
* @flow
*/
import electron from 'electron';
import MenuBuilder from './menu.js';

import fs from 'fs';

import watchman from 'fb-watchman';
var client = new watchman.Client();

import Store from './store.js';

const app = electron.app;
const ipcMain = electron.ipcMain;
const dialog = electron.dialog;

// Adds debug features like hotkeys for triggering dev tools and reload
require('electron-debug')();

const store = new Store({
  configName: 'electra_store'
});

const storeData = store.parseDataFile('./electra_store.json');
const monitors = storeData.monitors;

function getSubscriptionName (folderName) {
  for(let i = 0; i < monitors.length; i++) {
    if( monitors[i].folder == folderName ) {
      return monitors[i].subscriptionName;
    }
  }

  return '';
}

let checkFileExists = path => new Promise( resolve => fs.access(path, fs.F_OK, err => resolve(!err)) );

monitors.forEach( (monitor) => {

  fs.watch(monitor.folder,
          (eventType, fileName) => {

            if( fileName ) {
              const _path = monitor.folder + '\\' + fileName;

              checkFileExists(_path)
              .then(
                 isExists => {
                            if( isExists ) {
                              console.log(`${_path} is reported to client`);
                              const subscriptionName = getSubscriptionName(monitor.folder);
                              if( subscriptionName ) {
                                    mainWindow.webContents.send('onFolderSubscription', {
                                        msg: {
                                          subscription: subscriptionName,
                                          time: 0 //file.mtime_ms
                                        }
                                    });
                              }
                            } else {
                              console.log('Report to client skipped');
                            }
                          }
              );
          }
    })
})

// Prevent window being garbage collected
let mainWindow;

function onClosed() {
	// Dereference the window
	// For multiple windows store them in an array
	mainWindow = null;
}

function createMainWindow() {
	const win = new electron.BrowserWindow({
		width: 600,
		height: 400
	});

	win.loadURL(`file://${__dirname}/app.html`);
  win.openDevTools();
	win.on('closed', onClosed);

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  win.webContents.on('did-finish-load', () => {
     if (!mainWindow) {
       throw new Error('"mainWindow" is not defined');
     }
     win.show();
     win.focus();

     win.webContents.send('initStore', {
       msg: monitors
     });

  });

	return win;
}

const installExtensions = async () => {

   const installer = require('electron-devtools-installer');
   const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
   const extensions = [
    'REACT_DEVELOPER_TOOLS',
    'REDUX_DEVTOOLS'
    ];

   return Promise
      .all(extensions.map(name => installer.default(installer[name], forceDownload)))
      .catch(console.error);

}

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (!mainWindow) {
		mainWindow = createMainWindow();
	}
});

app.on('ready', async() => {

  await installExtensions();

	mainWindow = createMainWindow();

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  ipcMain.on('async-message', (event, props) => {

    const folder =
      dialog.showOpenDialog(mainWindow, {
            properties: ['openDirectory']
      });

    console.log(folder + ' added');
  });

});
