var assert = require('assert');
var Weapon = require('../../../app/entities/weapon');

describe('Weapon', function () {
  var weapon;
  var fireCallback, fireCalls;

  before(function () {
    fireCalls = 0;
    fireCallback = function(fromX, fromY, aimVector, tank) {
      fireCalls += 1;
    };

    weapon = new Weapon(fireCallback);
  });

  describe('newly created', function () {
    it('can fire immediately', function () {
      assert.equal(weapon.canFire(), true);
    });
  });

  describe('#update()', function () {
    it('decreases fireDelay by delta', function () {
      var fireDelayBefore = weapon.fireDelay;

      weapon.update(1.5);

      assert.equal(fireDelayBefore - 1.5, weapon.fireDelay);
    });
  });

  describe('#fire()', function () {
    it('invokes fire callback', function () {
      weapon.fire(1, 2, {x: 0, y: 1}, 'tank');

      assert.equal(fireCalls, 1);
    });

    it('is limited to one shot per second', function () {
      weapon.fire(1, 2, {x: 0, y: 1}, 'tank');
      weapon.fire(1, 2, {x: 0, y: 1}, 'tank');

      assert.equal(fireCalls, 1);

      weapon.update(1);
      weapon.fire(1, 2, {x: 0, y: 1}, 'tank');

      assert.equal(fireCalls, 2);
    });
  });
});