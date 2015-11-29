var React = require('react');
var ReactDOM = require('react-dom');

var p2 = require('@psalaets/p2');

var request = require('superagent');

var GameLogic = require('./game-logic');
var TreadControls = require('./components/tread-controls');

// dom elements

var main = document.getElementById('main');
var controls = document.getElementById('controls');

// game stuff

var GameBoard = require('./components/game-board');

var turretRotation = 0;

function leftThrottle(power) {
  // negate power because phyiscs is y-up but svg is y-down
  power = -power;

  tank.leftThrottle(power);
}

function rightThrottle(power) {
  // negate power because phyiscs is y-up but svg is y-down
  power = -power;

  tank.rightThrottle(power);
}

var sprites;

request
  .get('svg/sprites.json')
  .end(function(err, res) {
    if (err) {
      console.log(err);
      return;
    }

    sprites = res.body;

    requestAnimationFrame(updateLoop);
  });

var game = new GameLogic();

var tank = game.addTank(150, 0);
var tank2 = game.addTank(750, 150);

function updateLoop(nowMillis) {
  requestAnimationFrame(updateLoop);

  game.update(nowMillis);

  render(game.getState());
}

function render(state) {
  var tanks = state.tanks.map(function(tank) {
    var {x, y, rotation, id} = tank;
    return {
      id,
      x,
      y,
      rotation,
      turretRotation: turretRotation
    };
  });

  ReactDOM.render(<GameBoard sprites={sprites} tanks={tanks}/>, main);
  ReactDOM.render(<TreadControls onLeftChange={leftThrottle} onRightChange={rightThrottle}/>, controls);
}
