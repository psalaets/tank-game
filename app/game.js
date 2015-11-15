var p2 = require('@psalaets/p2');

module.exports = Game;

function Game() {
  this.lastUpdateSeconds = 0;

  this.world = new p2.World({
    gravity: [0, 0]
  });

  this.tanks = [];
}

Game.prototype = {
  // add tank to game
  addTank(tank) {
    this.tanks.push(tank);

    this.world.addBody(tank.body);
    tank.vehicle.addToWorld(this.world);
  },
  // update game
  update(nowMillis) {
    var nowSeconds = nowMillis / 1000;

    this.world.step(1 / 60, nowSeconds - this.lastUpdateSeconds);

    this.lastUpdateSeconds = nowSeconds;
  },
  // state of everything in the game
  getState() {
    var state = {
      tanks: this.tanks.slice()
    };

    return state;
  }
};