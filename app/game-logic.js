var p2 = require('@psalaets/p2');

var Tank = require('./entities/tank');
var Shell = require('./entities/shell');

module.exports = GameLogic;

function GameLogic() {
  this.world = new p2.World({
    gravity: [0, 0]
  });

  this.tanks = [];
  this.shells = [];

  this.nextEntityId = 0;
}

GameLogic.prototype = {
  shoot(fromX, fromY, aimVector) {
    var id = this.nextEntityId++;
    var shell = new Shell(id, {
      x: fromX,
      y: fromY
    });

    shell.launch(aimVector);

    this.world.addBody(shell.body);
    this.shells.push(shell);
  },
  addTankRandomly() {
    var x = (Math.random() * 700) + 100;
    var y = (Math.random() * 700) + 100;

    return this.addTank(x, y);
  },
  // add tank to game
  addTank(x, y) {
    var id = this.nextEntityId++;
    var tank = new Tank(id, {x, y});

    this.tanks.push(tank);
    tank.addToWorld(this.world);

    return tank;
  },
  getTank(id) {
    return this.tanks.find(tank => tank.id === id);
  },
  removeTank(id) {
    var index = this.tanks.findIndex(tank => tank.id === id);

    if (index != -1) {
      var tank = this.getTank(id);
      tank.removeFromWorld(this.world);

      this.tanks.splice(index, 1);
    }
  },
  // update game
  update(deltaSeconds) {
    this.world.step(1 / 30, deltaSeconds);

    this.tanks.forEach(tank => tank.update(deltaSeconds));
  },
  // state of everything in the game
  getState() {
    var state = {
      tanks: this.tanks.map(tank => tank.toData()),
      shells: this.shells.map(shell => shell.toData())
    };

    return state;
  }
};