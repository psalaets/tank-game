var assert = require('assert');
var TankMappings = require('../../app/tank-mappings');

describe('TankMappings', function () {
  describe('assigning gunner to a tank', function () {
    it('pairs gunner id with the given tank', function () {
      var mappings = new TankMappings();

      var tank = 'tank';
      var gunnerId = '123';

      mappings.assignGunner(gunnerId, tank);

      assert.equal(mappings.findTankOf(gunnerId), tank);
    });
  });

  describe('assigning driver to a tank', function () {
    it('pairs driver id with the given tank', function () {
      var mappings = new TankMappings();

      var tank = 'tank';
      var driverId = '123';

      mappings.assignDriver(driverId, tank);

      assert.equal(mappings.findTankOf(driverId), tank);
    });
  });

  describe('finding tank with no driver', function () {
    describe('there is a tank that only has a gunner', function () {
      it('returns the gunner-only tank', function () {
        var mappings = new TankMappings();

        var gunnerId = '123';
        var driverId = '456';
        var tank1 = 'tank1';
        var tank2 = 'tank2';

        mappings.assignDriver(driverId, tank1);
        mappings.assignGunner(gunnerId, tank2);

        assert.equal(mappings.findDriverlessTank(), tank2);
      });
    });

    describe('there are no driverless tanks', function () {
      it('returns null', function () {
        var mappings = new TankMappings();

        var driverId = '456';
        var tank1 = 'tank1';

        mappings.assignDriver(driverId, tank1);

        assert.equal(mappings.findDriverlessTank(), null);
      });
    });
  });

  describe('finding tank with no gunner', function () {
    describe('there is a tank that only has a driver', function () {
      it('returns the driver-only tank', function () {
        var mappings = new TankMappings();

        var gunnerId = '123';
        var driverId = '456';
        var tank1 = 'tank1';
        var tank2 = 'tank2';

        mappings.assignDriver(driverId, tank1);
        mappings.assignGunner(gunnerId, tank2);

        assert.equal(mappings.findGunnerlessTank(), tank1);
      });
    });

    describe('there are no gunnerless tanks', function () {
      it('returns null', function () {
        var mappings = new TankMappings();

        var gunnerId = '456';
        var tank1 = 'tank1';

        mappings.assignGunner(gunnerId, tank1);

        assert.equal(mappings.findGunnerlessTank(), null);
      });
    });
  });

  describe('finding a tank by player id', function () {
    it('can find tank by driver id', function () {
      var mappings = new TankMappings();

      var driverId = '123';
      var tank = 'tank';

      mappings.assignDriver(driverId, tank);

      assert.equal(mappings.findTankOf(driverId), tank);
    });

    it('can find tank by gunner id', function () {
      var mappings = new TankMappings();

      var gunnerId = '123';
      var tank = 'tank';

      mappings.assignGunner(gunnerId, tank);

      assert.equal(mappings.findTankOf(gunnerId), tank);
    });

    it('returns null for unknown player id', function () {
      var mappings = new TankMappings();

      assert.equal(mappings.findTankOf('123'), null);
    });
  });
});