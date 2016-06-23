/* eslint no-console: 0 */
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipcMain = electron.ipcMain;
const net = require('net');
const HOST = '127.0.0.1';
const PORT = 9106;
const client = new net.Socket();
let mainWindow;

client.on('data', (data) => {
  if (data.toString().trim() === 'disconnect') {
    client.destroy();
  }
});

function createWindow() {
  mainWindow = new BrowserWindow({ width: 800, height: 600 });
  mainWindow.loadURL(`file://${__dirname}/index.html`);
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
  mainWindow.webContents.openDevTools();
  client.connect(PORT, HOST, () => {
    client.write('ready');
  });
}
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  app.quit();
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
ipcMain.on('on-listening', () => {
  client.write('on-listening');
});
ipcMain.on('on-mouse-event', (event, arg) => {
  client.write(arg);
});

ipcMain.on('on-keyboard-event', (event, arg) => {
  client.write(arg);
});
