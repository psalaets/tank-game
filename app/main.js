var React = require('react');
var ReactDOM = require('react-dom');

var p2 = require('@psalaets/p2');

var request = require('superagent');

var TreadControls = require('./components/tread-controls');

// game stuff

var GameBoard = require('./components/game-board');

var Tank = require('./entities/tank');

var tank = new Tank(100, 100);
var turretRotation = 0;

// dom elements

var main = document.getElementById('main');
var controls = document.getElementById('controls');

function leftThrottle(power) {
  tank.leftThrottle(power);
}

function rightThrottle(power) {
  tank.rightThrottle(power);
}

// ???

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

function renderTank(tank) {
  var tanks = [tank].map(function(tank) {
    var {x, y, rotation} = tank;
    return {
      x,
      y,
      rotation,
      turretRotation: turretRotation
    }
  });

  // console.dir(tanks)

  ReactDOM.render(<GameBoard sprites={sprites} tanks={tanks}/>, main);
  ReactDOM.render(<TreadControls onLeftChange={leftThrottle} onRightChange={rightThrottle}/>, controls);
}

var lastTimeSeconds;
var nowSeconds;

var world = new p2.World({
  gravity: [0, 0]
});

world.addBody(tank.body)
tank.vehicle.addToWorld(world)

function updateLoop(nowMillis) {
  requestAnimationFrame(updateLoop);

  nowSeconds = nowMillis / 1000;
  lastTimeSeconds = lastTimeSeconds || nowSeconds;

  var deltaSeconds = nowSeconds - lastTimeSeconds;
  world.step(1 / 60, deltaSeconds, 10);

  renderTank(tank);
}
