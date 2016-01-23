var assert = require('assert');
var Tank = require('../../../app/entities/tank');

describe('Tank entity', function() {
  describe('creating', function () {
    it('sets id', function() {
      var tank = new Tank(5, {});

      assert.equal(tank.id, 5);
    });

    it('can set position', function() {
      var tank = new Tank(5, {x : 10, y: 15});

      assert.equal(tank.x, 10);
      assert.equal(tank.y, 15);
    });

    it('can set rotation', function() {
      var tank = new Tank(5, {rotation: 90});

      assert.equal(tank.rotation, 90);
    });

    it('can set turret rotation', function() {
      var tank = new Tank(5, {turretRotation: 70});

      assert.equal(tank.turretRotation, 70);
    });

    it('is not firing', function () {
      var tank = new Tank(1, {});

      assert.equal(tank.firing, false);
    });
  });

  describe('turret', function () {
    it('does not rotate when turret throttle is 0', function () {
      var tank = new Tank(1, {});
      tank.setTurretThrottle(0);

      tank.update(1);

      assert.equal(tank.turretRotation, 0);
    });

    it('rotates clockwise when turret throttle is > 0', function () {
      var tank = new Tank(1, {});
      tank.setTurretThrottle(0.5);

      tank.update(1);

      assert.equal(tank.turretRotation, 22.5);
    });

    it('rotates counter-clockwise when turret throttle is < 0', function () {
      var tank = new Tank(1, {});
      tank.setTurretThrottle(-0.5);

      tank.update(1);

      assert.equal(tank.turretRotation, 360 - 22.5);
    });
  });

  describe('.aimVector', function () {
    it('should point up by default', function () {
      var tank = new Tank(1, {});

      assert.equal(tank.aimVector.x, 0);
      assert.equal(tank.aimVector.y, -1);
    });

    it('rotates with tank rotation', function () {
      var tank = new Tank(1, {
        rotation: 90
      });

      assert.equal(tank.aimVector.x, 1);
      assert.equal(tank.aimVector.y, 0);
    });

    it('rotates with turret rotation', function () {
      var tank = new Tank(1, {
        turretRotation: 270
      });

      assert.equal(tank.aimVector.x, -1);
      assert.equal(tank.aimVector.y, 0);
    });

    it('is based on tank rotation plus turret rotation', function () {
      var tank = new Tank(1, {
        rotation: 90,
        turretRotation: 90
      });

      assert.equal(tank.aimVector.x, 0);
      assert.equal(tank.aimVector.y, 1);
    });
  });

  describe('#toData()', function () {
    it('returns object with tank properties', function () {
      var tank = new Tank(1, {
        x: 5,
        y: 10,
        rotation: 180
      });

      assert.deepEqual(tank.toData(), {
        id: 1,
        x: 5,
        y: 10,
        rotation: 180,
        turretRotation: 0
      });
    });
  });

  describe('updating', function () {
    it('updates weapon', function() {
      var updateArgs = [];
      var weapon = {
        fire: function(fromX, fromY, aimVector, tank) {
          fireArgs.push({
            fromX,
            fromY,
            aimVector,
            tank
          });
        },
        update: function(deltaSeconds) {
          updateArgs.push(deltaSeconds);
        }
      };

      var tank = new Tank(1, {
        weapon: weapon
      });

      tank.update(1);
      tank.update(5);

      assert.deepEqual(updateArgs, [1, 5]);
    });

    it('fires weapon if firing', function () {
      var fireArgs = [];
      var weapon = {
        fire: function(fromX, fromY, aimVector, tank) {
          fireArgs.push({
            fromX,
            fromY,
            aimVector,
            tank
          });
        },
        update: function() {}
      };

      var tank = new Tank(1, {
        weapon: weapon
      });

      tank.startFiring();
      tank.update(1);

      var singleFire = fireArgs[0];

      assert.equal(fireArgs.length, 1);
      assert.equal(singleFire.fromX, 0);
      assert.equal(singleFire.fromY, 0);
      assert.deepEqual(singleFire.aimVector, {x: 0, y: -1});
      assert.equal(singleFire.tank, tank);
    });

    it('does not fire weapon if firing has stopped', function () {
      var fireArgs = [];
      var weapon = {
        fire: function(fromX, fromY, aimVector, tank) {
          fireArgs.push({
            fromX,
            fromY,
            aimVector,
            tank
          });
        },
        update: function() {}
      };

      var tank = new Tank(1, {
        weapon: weapon
      });

      tank.startFiring();
      tank.stopFiring();
      tank.update(1);

      assert.equal(fireArgs.length, 0);
    });
  });
});