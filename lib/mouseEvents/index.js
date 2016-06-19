const robot = require('robotjs');


exports.move = function move(x, y) {
  robot.moveMouse(x, y);
};

exports.click = function click(x, y) {
  robot.moveMouse(x, y);
  robot.mouseClick();
};
