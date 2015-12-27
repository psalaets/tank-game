var assert = require('assert');
var Shell = require('../../../app/entities/shell');

describe('Shell entity', function() {
  describe('newly created', function () {
    describe('with no properties specified', function () {
      it('sets id', function () {
        var shell = new Shell(1);

        assert.equal(shell.id, 1);
      });

      it('sets position to (0, 0)', function () {
        var shell = new Shell(1);

        assert.equal(shell.x, 0);
        assert.equal(shell.y, 0);
      });
    });

    describe('with properties specified', function () {
      it('sets id', function () {
        var shell = new Shell(1, {});

        assert.equal(shell.id, 1);
      });

      it('can set position', function () {
        var shell = new Shell(1, {
          x: 5,
          y: 10
        });

        assert.equal(shell.x, 5);
        assert.equal(shell.y, 10);
      });
    });
  });

  describe('#toData()', function () {
    it('returns object with shell properties', function () {
      var shell = new Shell(1, {
        x: 5,
        y: 10
      });

      assert.deepEqual(shell.toData(), {
        id: 1,
        x: 5,
        y: 10,
        radius: 50
      });
    });
  });
});