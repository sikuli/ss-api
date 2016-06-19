const { ipcRenderer } = require('electron');
// Tell the main process that the renderer is ready to listen for events
ipcRenderer.send('on-listening');
document.onclick = (event) => {
  ipcRenderer.send('on-mouse-event', `{ "type": "mouseClick", "id": "${event.target.id}"}`);
};
