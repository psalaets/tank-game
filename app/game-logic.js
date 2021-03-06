var p2 = require('p2');
require('./monkey-patch-p2')(p2);

var Tank = require('./entities/tank');
var Shell = require('./entities/shell');
var Weapon = require('./entities/weapon');
var Barrel = require('./entities/barrel');

module.exports = GameLogic;

function GameLogic() {
  this.world = new p2.World({
    gravity: [0, 0]
  });

  this.tanks = [];
  this.shells = [];
  this.obstacles = [];

  this.nextEntityId = 1;
}

GameLogic.prototype = {
  shoot(fromX, fromY, aimVector, tank) {
    var id = this.nextEntityId++;
    var shell = new Shell(id, {
      x: fromX,
      y: fromY
    });

    shell.launch(aimVector);

    this.world.addBody(shell.body);
    this.shells.push(shell);

    this.world.disableBodyCollision(shell.body, tank.body);
  },
  addBarrel(x, y, radius) {
    var id = this.nextEntityId++;
    var barrel = new Barrel(id, {x, y, radius});

    this.world.addBody(barrel.body);
    this.obstacles.push(barrel);
  },
  addTankRandomly() {
    var x = (Math.random() * 700) + 100;
    var y = (Math.random() * 700) + 100;

    return this.addTank(x, y);
  },
  // add tank to game
  addTank(x, y) {
    var weapon = new Weapon(this.shoot.bind(this));

    var id = this.nextEntityId++;
    var tank = new Tank(id, {
      x,
      y,
      weapon
    });

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
  removeShell(id) {
    var index = this.shells.findIndex(shell => shell.id === id);

    if (index != -1) {
      var shell = this.shells[index];

      this.world.removeBody(shell.body);
      this.shells.splice(index, 1);
    }
  },
  // update game
  update(deltaSeconds) {
    this.world.step(1 / 30, deltaSeconds);

    this.tanks.forEach(tank => tank.update(deltaSeconds));
    this.shells.forEach(shell => shell.update(deltaSeconds));

    this.shells.slice().forEach(shell => {
      if (!shell.active) {
        this.removeShell(shell.id);
      }
    });
  },
  // state of everything in the game
  getState() {
    var state = {
      tanks: this.tanks.map(tank => tank.toData()),
      shells: this.shells.map(shell => shell.toData()),
      obstacles: this.obstacles.map(ob => ob.toData())
    };

    return state;
  }
};