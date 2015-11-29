var nodeGameloop = require('node-gameloop');

module.exports = function gameloop(update, updatesPerSecond) {
  var loopId;

  return {
    start() {
      loopId = nodeGameloop.setGameLoop(update, 1000 / updatesPerSecond);
    },
    stop() {
      nodeGameloop.clearGameLoop(loopId);
    }
  }
};