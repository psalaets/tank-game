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

      it('sets position', function() {
        var tank = new Tank(5, {x : 10, y: 15});

        assert.equal(tank.x, 10);
        assert.equal(tank.y, 15);
      });

      it('sets rotation', function() {
        var tank = new Tank(5, {rotation: 90});

        assert.equal(tank.rotation, 90);
      });
    });
  });
});