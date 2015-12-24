var createGameLoop = require('./game-loop');
var GameLogic = require('./game-logic');

var fires = 0;

var gameLogic = new GameLogic();

var tank1 = gameLogic.addTank(10, 10)
var tank2 = gameLogic.addTank(500, 10)

var gameLoop = createGameLoop(function(delta) {
  fires += 1;

  gameLogic.update(delta);

  if (fires > 150) {
    tank1.setLeftThrottle(1);
    tank1.setRightThrottle(1);
  }

  var state = gameLogic.getState();

  console.log(state.tanks.map(t => `${t.id}: ${t.x}, ${t.y}`).join('\n'))
}, 30);

gameLoop.start();