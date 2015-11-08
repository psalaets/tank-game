var assert = require('assert');
var svg = require('../../../../app/components/helpers/svg');

describe('svg helper', function() {
  describe('.transform()', function() {
    it('can translate', function() {
      var result = svg.transform({
        x: 5,
        y: 10
      });

      assert.equal('translate(5 10)', result);
    });

    it('can rotate', function() {
      var result = svg.transform({
        rotation: 90,
        rx: 20,
        ry: 40
      });

      assert.equal('rotate(90 20 40)', result);
    });

    it('can scale', function() {
      var result = svg.transform({
        scaleX: 1,
        scaleY: -1
      });

      assert.equal('scale(1 -1)', result);
    });

    it('can translate, rotate and scale together', function() {
      var result = svg.transform({
        x: 5,
        y: 10,
        rotation: 90,
        rx: 20,
        ry: 40,
        scaleX: 1,
        scaleY: -1
      });

      assert.equal('translate(5 10) rotate(90 20 40) scale(1 -1)', result);
    });
  });
});