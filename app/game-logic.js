var p2 = require('@psalaets/p2');

var Tank = require('./entities/tank');

module.exports = GameLogic;

function GameLogic() {
  this.world = new p2.World({
    gravity: [0, 0]
  });

  this.tanks = [];
  this.nextTankId = 0;
}

GameLogic.prototype = {
  // add tank to game
  addTank(x, y) {
    var id = this.nextTankId++;
    var tank = new Tank(id, x, y);

    this.tanks.push(tank);

    this.world.addBody(tank.body);
    tank.vehicle.addToWorld(this.world);

    return tank;
  },
  getTank(id) {
    return this.tanks.find(tank => tank.id === id);
  },
  removeTank(id) {
    var index = this.tanks.findIndex(tank => tank.id === id);

    if (index != -1) {
      this.tanks.splice(index, 1);
    }
  },
  // update game
  update(deltaSeconds) {
    this.world.step(1 / 30, deltaSeconds);
  },
  // state of everything in the game
  getState() {
    var state = {
      tanks: this.tanks.slice()
    };

    return state;
  }
};