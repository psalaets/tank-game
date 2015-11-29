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
  },
  // state of everything in the game
  getState() {
    var state = {
      tanks: this.tanks.map(function(tank) {
        return {
          id: tank.id,
          x: tank.x,
          y: tank.y,
          rotation: tank.rotation,
          turretRotation: 0
        };
      })
    };

    return state;
  }
};