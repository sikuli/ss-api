const { ipcRenderer } = require('electron');
// Tell the main process that the renderer is ready to listen for events
ipcRenderer.send('on-listening');

document.onclick = (event) => {
  // single left click
  if (event.detail === 1) {
    ipcRenderer.send('on-mouse-event', `{ "type": "leftClick", "id": "${event.target.id}"}`);
  }
};

document.onmousedown = (event) => {
  if (event.button === 2) {
    ipcRenderer.send('on-mouse-event', `{ "type": "rightClick", "id": "${event.target.id}"}`);
  }
};

document.ondblclick = (event) => {
  ipcRenderer.send('on-mouse-event', `{ "type": "doubleClick", "id": "${event.target.id}"}`);
};
