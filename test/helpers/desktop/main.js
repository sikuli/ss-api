/* eslint no-console: 0 */
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipcMain = electron.ipcMain;

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({ width: 800, height: 600 });
  mainWindow.loadURL(`file://${__dirname}/index.html`);
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
  console.log('ready');
}
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  console.log('{id: "btn-1"}');
  app.quit();
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
ipcMain.on('on-listening', () => {
  console.log('on-listening');
});

ipcMain.on('on-mouse-event', (event, arg) => {
  console.log(arg);
});
