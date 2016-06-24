const robot = require('robotjs');
// key names are taken from robotjs v0.4.4
const keyNames = [
  'backspace', 'delete', 'enter', 'tab', 'escape', 'up', 'down',
  'right', 'left', 'home', 'end', 'pageup', 'pagedown', 'f1', 'f2', 'f3',
  'f4', 'f5', 'f6', 'f7', 'f8', 'f9', 'f10', 'f11', 'f12',
  'f13', 'f14', 'f15', 'f16', 'f17', 'f18', 'f19', 'f20', 'f21',
  'f22', 'f23', 'f24', 'command', 'alt', 'control', 'shift', 'right_shift', 'space',
  'printscreen', 'insert', 'audio_mute', 'audio_vol_down', 'audio_vol_up',
  'audio_play', 'audio_stop', 'audio_pause', 'audio_prev', 'audio_next',
  'audio_rewind', 'audio_forward', 'audio_repeat', 'audio_random', 'numpad_0',
  'numpad_1', 'numpad_2', 'numpad_3', 'numpad_4', 'numpad_5', 'numpad_6',
  'numpad_7', 'numpad_8', 'numpad_9', 'lights_mon_up', 'lights_mon_down',
  'lights_kbd_toggle', 'lights_kbd_up', 'lights_kbd_down'
];
const modifierNames = ['alt', 'command', 'control', 'shift'];

// Press a signle key
exports.keyPress = function keyPress(key, modifier) {
  if (modifier && key && key.length === 1) {
    if (Array.isArray(modifier) && modifier.every((m) => modifierNames.indexOf(m) > -1)) {
      return robot.keyTap(key.toLowerCase(), modifier[0]);
    }
    throw new Error('Invalid modifier. Expected an array of valid modifiers' +
    ' (alt, command, control, and shift).');
  }
  else if (!modifier && key && (keyNames.indexOf(key) > -1 || key.length === 1)) {
    return robot.keyTap(key.toLowerCase());
  }
  throw new Error(`Unexpected key value, ${key}. keyPress expects a single key.`);
};

exports.type = function type(str) {
  robot.typeString(str);
};
