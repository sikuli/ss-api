const path = require('path');
const spawn = require('child_process').spawn;
const electronCliPath = require('electron-prebuilt');
const mainPath = path.resolve(__dirname, 'main.js');
let electron;
/* Starts Electron window
*/
exports.start = function start() {
  return new Promise((resolve, reject) => {
    if (!electron) {
      electron = spawn(electronCliPath, [mainPath], { detached: false });
      electron.stdout.on('data', (chunk) => {
        if (chunk.toString().trim() === 'ready') {
          resolve();
        }
        else {
          reject(new Error('App is not ready'));
        }
      });
    }
    else {
      reject(new Error('App is already running'));
    }
  });
};
/*
 * Listens for mouse/keyboard events on the crated Window.
 * @returns {Promise} Returns a Promise that's fulfilled with an Object value
 * that indicates the id of the element that received the mouse/keyboard event,
 * the type of the event, and the text value for keyboard typing events.
*/
exports.listen = function listen() {
  return new Promise((resolve, reject) => {
    if (electron) {
      // electron.stderr.pipe(process.stderr);
      // electron.stdout.pipe(process.stdout);
      // communicate with the child process via the stdio pipe
      electron.stdout.on('data', (chunk) => {
        if (chunk.toString().trim() === 'on-listening') {
          resolve({ ready: true });
        }
        else {
          resolve(JSON.parse(chunk.toString()));
        }
      });
    }
    else if (!electron) {
      reject(new Error('Electron instance is not running'));
    }
  });
};

exports.quit = function quit() {
  if (electron) {
    electron.kill();
  }
};
