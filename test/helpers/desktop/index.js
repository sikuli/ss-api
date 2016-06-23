const path = require('path');
const spawn = require('child_process').spawn;
const electronCliPath = require('electron-prebuilt');
const mainPath = path.resolve(__dirname, 'main.js');
const events = require('events');
const eventEmitter = new events.EventEmitter();
const net = require('net');
const HOST = '127.0.0.1';
const PORT = 9106;
let socket;
let electron;
let response = [];
let server;

function processData(data) {
  const message = data.toString().trim();
  if (message === 'ready') {
    eventEmitter.emit('clientIsReady');
  }
  else if (message === 'on-listening') {
    eventEmitter.emit('clientIslistening');
  }
  else {
    response.push(JSON.parse(message));
    eventEmitter.emit('itemAdded');
  }
}
/* Starts Electron window
*/
exports.start = function start() {
  return new Promise((resolve, reject) => {
    if (!electron && !server) {
      electron = spawn(electronCliPath, [mainPath], { detached: false });
      // create a TCP server to communicate with the client browser window
      // Note: Using pipes to communicate with the spawned process resulted in
      //  duplicate messages and unexpected behavior
      server = net.createServer((sock) => {
        socket = sock;
        sock.on('data', (data) => processData(data));
      });
      server.listen(PORT, HOST);
      eventEmitter.on('clientIsReady', () => resolve({ ready: true }));
    }
    else {
      reject(new Error('App is already running'));
    }
  });
};
/*
 * Listens for mouse/keyboard events on the crated Window.
 * @param {number} actionCount - the number of mouse/keyboard actions to listen for.
 * @returns {Promise} Returns a Promise that's fulfilled with an Object value
 * that indicates the id of the element that received the mouse/keyboard event,
 * the type of the event, and the text value for keyboard typing events.
*/
exports.listen = function listen(actionCount) {
  return new Promise((resolve, reject) => {
    if (electron) {
      eventEmitter.on('clientIslistening', () => {
        resolve({ ready: true });
      });
      // communicate with the child process via the TCP socket
      eventEmitter.on('itemAdded', () => {
        if (actionCount === response.length) {
          resolve(response);
        }
      });
    }
    else {
      reject(new Error('Electron instance is not running'));
    }
  });
};

exports.quit = function quit() {
  return new Promise((resolve, reject) => {
    if (electron) {
      socket.write('disconnect');
      server.close(() => {
        server = null;
        electron.kill();
        response = [];
        electron = null;
        resolve();
      });
    }
    else {
      reject(new Error('Electron instance is not running'));
    }
  });
};
