const robot = require('robotjs');


exports.move = function move(x, y) {
  robot.moveMouse(x, y);
};

exports.click = function click(x, y) {
  robot.moveMouse(x, y);
  robot.mouseClick();
};

exports.rightClick = function rightClick(x, y) {
  robot.moveMouse(x, y);
  robot.mouseClick('right');
};

exports.doubleClick = function doubleClick(x, y) {
  robot.moveMouse(x, y);
  robot.mouseClick('left', true);
};
