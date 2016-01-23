var assert = require('assert');
var TankMappings = require('../../app/tank-mappings');

describe('TankMappings', function () {
  describe('assigning gunner to a tank', function () {
    it('pairs gunner id with the given tank id', function () {
      var mappings = new TankMappings();

      var tankId = 'tank';
      var gunnerId = '123';

      mappings.assignGunner(gunnerId, tankId);

      assert.equal(mappings.findTankOf(gunnerId), tankId);
    });

    it('replaces any existing gunner assigned to tank', function () {
      var mappings = new TankMappings();

      mappings.assignGunner('123', 'tank');
      mappings.assignGunner('456', 'tank');

      assert.equal(mappings.findTankOf('456'), 'tank');
    });
  });

  describe('assigning driver to a tank', function () {
    it('pairs driver id with the given tank id', function () {
      var mappings = new TankMappings();

      var tankId = 'tank';
      var driverId = '123';

      mappings.assignDriver(driverId, tankId);

      assert.equal(mappings.findTankOf(driverId), tankId);
    });

    it('replaces any existing driver assigned to tank', function () {
      var mappings = new TankMappings();

      mappings.assignDriver('123', 'tank');
      mappings.assignDriver('456', 'tank');

      assert.equal(mappings.findTankOf('456'), 'tank');
    });
  });

  describe('finding tank with no driver', function () {
    describe('there is a tank that only has a gunner', function () {
      it('returns the id of gunner-only tank', function () {
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
      it('returns the id of driver-only tank', function () {
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

  describe('removing a player', function () {
    it('can remove a driver', function () {
      var mappings = new TankMappings();
      mappings.assignDriver('123', 'tank');

      mappings.removePlayer('123');

      assert.equal(mappings.findTankOf('123'), null);
    });

    it('can remove a gunner', function () {
      var mappings = new TankMappings();
      mappings.assignGunner('123', 'tank');

      mappings.removePlayer('123');

      assert.equal(mappings.findTankOf('123'), null);
    });

    it('does nothing when removing player with no assignments', function () {
      var mappings = new TankMappings();
      mappings.assignGunner('123', 'tank');

      mappings.removePlayer('456');

      assert.equal(mappings.findTankOf('456'), null);
    });
  });

  describe('finding empty tank', function () {
    it('returns a tank with no gunner and no driver', function () {
      var mappings = new TankMappings();
      mappings.assignGunner('123', 'tank');
      mappings.removePlayer('123');


      assert.equal(mappings.findEmptyTank(), 'tank');
    });

    it('returns null if no empty tanks', function () {
      var mappings = new TankMappings();
      mappings.assignGunner('123', 'tank');

      assert.equal(mappings.findEmptyTank(), null);
    });
  });

  describe('unregistering a tank', function () {
    it('removes driver and gunner mappings to the tank', function () {
      var mappings = new TankMappings();
      mappings.assignGunner('123', 'tank');
      mappings.assignDriver('456', 'tank');

      mappings.unregisterTank('tank');

      assert.equal(mappings.findTankOf('123'), null);
      assert.equal(mappings.findTankOf('456'), null);
    });
  });

  describe('player role', function () {
    describe('checking if player is driver', function () {
      it('returns true if player is a driver', function () {
        var mappings = new TankMappings();
        mappings.assignDriver('123', 'tank');

        assert.equal(mappings.isDriver('123'), true);
      });

      it('returns false if player is a gunner', function () {
        var mappings = new TankMappings();
        mappings.assignGunner('123', 'tank');

        assert.equal(mappings.isDriver('123'), false);
      });

      it('returns false if player has no role', function () {
        var mappings = new TankMappings();

        assert.equal(mappings.isDriver('123'), false);
      });
    });

    describe('checking if player is gunner', function () {
      it('returns true if player is a gunner', function () {
        var mappings = new TankMappings();
        mappings.assignGunner('123', 'tank');

        assert.equal(mappings.isGunner('123'), true);
      });

      it('returns false if player is a driver', function () {
        var mappings = new TankMappings();
        mappings.assignDriver('123', 'tank');

        assert.equal(mappings.isGunner('123'), false);
      });

      it('returns false if player has no role', function () {
        var mappings = new TankMappings();

        assert.equal(mappings.isGunner('123'), false);
      });
    });
  });
});