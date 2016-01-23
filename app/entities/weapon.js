module.exports = Weapon;

/**
* @param {Function} fireCallback - Invoked when this weapon fires
*/
function Weapon(fireCallback) {
  this.fireCallback = fireCallback;

  // how many seconds until this weapon can fire
  this.fireDelay = 0;
  // shots per second
  this.rateOfFire = 1;
}

Weapon.prototype = {
  update: function(deltaSeconds) {
    this.fireDelay -= deltaSeconds;
  },
  fire: function(fromX, fromY, aimVector, tank) {
    if (this.canFire()) {
      this.fireCallback(fromX, fromY, aimVector, tank);
      this.resetFireDelay();
    }
  },
  canFire: function() {
    return this.fireDelay <= 0;
  },
  resetFireDelay: function() {
    this.fireDelay = 1 / this.rateOfFire;
  }
};