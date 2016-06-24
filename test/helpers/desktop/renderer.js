const { ipcRenderer } = require('electron');
// Tell the main process that the renderer is ready to listen for events
window.onload = () => {
  ipcRenderer.send('on-listening');
};

document.onclick = (event) => {
  // single left click
  if (event.detail === 1) {
    ipcRenderer.send('on-mouse-event', JSON.stringify({ type: 'leftClick', id: event.target.id }));
  }
};

document.onmousedown = (event) => {
  if (event.button === 2) {
    ipcRenderer.send('on-mouse-event', JSON.stringify({ type: 'rightClick', id: event.target.id }));
  }
};

document.ondblclick = (event) => {
  ipcRenderer.send('on-mouse-event', JSON.stringify({ type: 'doubleClick', id: event.target.id }));
};

document.onkeydown = (event) => {
  const modifiers = [];
  if (event.shiftKey) modifiers.push('shift');
  if (event.altKey) modifiers.push('alt');
  if (event.ctrlKey) modifiers.push('control');
  const response = { type: 'keydown', key: event.key, modifiers, id: event.target.id };
  ipcRenderer.send('on-keyboard-event', JSON.stringify(response));
};
