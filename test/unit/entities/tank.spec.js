var assert = require('assert');
var Tank = require('../../../app/entities/tank');

describe('Tank entity', function() {
  describe('newly created', function () {
    describe('with no properties specified', function() {
      it('sets id', function() {
        var tank = new Tank(5);

        assert.equal(tank.id, 5);
      });

      it('is positioned at (0, 0)', function() {
        var tank = new Tank(5);

        assert.equal(tank.x, 0);
        assert.equal(tank.y, 0);
      });

      it('has no rotation', function() {
        var tank = new Tank(5);

        assert.equal(tank.rotation, 0);
      });

      it('has no turret rotation', function() {
        var tank = new Tank(5);

        assert.equal(tank.turretRotation, 0);
      });
    });

    describe('with properties specified', function () {
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
    });
  });

  describe('.aimVector', function () {
    it('should point up by default', function () {
      var tank = new Tank(1);

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
});