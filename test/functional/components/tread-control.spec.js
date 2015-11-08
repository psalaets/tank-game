var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');

var assert = require('assert');

var TreadControl = require('../../../app/components/tread-control');

describe('TreadControl component', function() {
  var testArea;

  beforeEach(function() {
    testArea = document.createElement('div');
    testArea.id = 'test-area';

    document.body.appendChild(testArea);
  });

  afterEach(function() {
    document.body.removeChild(testArea)
    testArea = null;
  });

  describe('on touchstart event', function() {
    describe('at top of control', function() {
      it('sets power to 1', function() {
        var onChange = powerChangeRecorder();
        var componentInstance = ReactDOM.render(<TreadControl onChange={onChange}/>, testArea);

        var rangeNode = componentInstance.refs.range;
        positionAt(rangeNode, 100);

        TestUtils.Simulate.touchStart(rangeNode, touchEvent(100));

        assert.deepEqual(onChange.powers, [1]);
      });
    });

    describe('in middle of control', function() {
      it('sets power to 0', function() {
        var onChange = powerChangeRecorder();
        var componentInstance = ReactDOM.render(<TreadControl onChange={onChange}/>, testArea);

        var rangeNode = componentInstance.refs.range;
        positionAt(rangeNode, 100);

        TestUtils.Simulate.touchStart(rangeNode, touchEvent(200));

        assert.deepEqual(onChange.powers, [0]);
      });
    });

    describe('at bottom of control', function() {
      it('sets power to -1', function() {
        var onChange = powerChangeRecorder();
        var componentInstance = ReactDOM.render(<TreadControl onChange={onChange}/>, testArea);

        var rangeNode = componentInstance.refs.range;
        positionAt(rangeNode, 100);

        TestUtils.Simulate.touchStart(rangeNode, touchEvent(300));

        assert.deepEqual(onChange.powers, [-1]);
      });
    });
  });

  describe('on touchmove event', function() {
    describe('above control', function() {
      it('sets power to 1', function() {
        var onChange = powerChangeRecorder();
        var componentInstance = ReactDOM.render(<TreadControl onChange={onChange}/>, testArea);

        var rangeNode = componentInstance.refs.range;
        positionAt(rangeNode, 100);

        TestUtils.Simulate.touchMove(rangeNode, touchEvent(0));

        assert.deepEqual(onChange.powers, [1]);
      });
    });

    describe('on forward side of control', function() {
      it('sets power to a positive number', function() {
        var onChange = powerChangeRecorder();
        var componentInstance = ReactDOM.render(<TreadControl onChange={onChange}/>, testArea);

        var rangeNode = componentInstance.refs.range;
        positionAt(rangeNode, 100);

        TestUtils.Simulate.touchMove(rangeNode, touchEvent(150));

        assert.deepEqual(onChange.powers, [0.5]);
      });
    });

    describe('on reverse side of control', function() {
      it('sets power to a negative number', function() {
        var onChange = powerChangeRecorder();
        var componentInstance = ReactDOM.render(<TreadControl onChange={onChange}/>, testArea);

        var rangeNode = componentInstance.refs.range;
        positionAt(rangeNode, 100);

        TestUtils.Simulate.touchMove(rangeNode, touchEvent(250));

        assert.deepEqual(onChange.powers, [-0.5]);
      });
    });

    describe('below control', function () {
      it('sets power to -1', function() {
        var onChange = powerChangeRecorder();
        var componentInstance = ReactDOM.render(<TreadControl onChange={onChange}/>, testArea);

        var rangeNode = componentInstance.refs.range;
        positionAt(rangeNode, 100);

        TestUtils.Simulate.touchMove(rangeNode, touchEvent(500));

        assert.deepEqual(onChange.powers, [-1]);
      });
    });

    describe('multiple events', function() {
      it('changes power multiple times', function() {
        var onChange = powerChangeRecorder();
        var componentInstance = ReactDOM.render(<TreadControl onChange={onChange}/>, testArea);

        var rangeNode = componentInstance.refs.range;
        positionAt(rangeNode, 100);

        TestUtils.Simulate.touchMove(rangeNode, touchEvent(100));
        TestUtils.Simulate.touchMove(rangeNode, touchEvent(200));
        TestUtils.Simulate.touchMove(rangeNode, touchEvent(300));

        assert.deepEqual(onChange.powers, [1, 0, -1]);
      });
    });
  });

  describe('on touchend event', function() {
    it('changes power to zero', function() {
      var onChange = powerChangeRecorder();
      var componentInstance = ReactDOM.render(<TreadControl onChange={onChange}/>, testArea);

      var rangeNode = componentInstance.refs.range;
      positionAt(rangeNode, 100);

      TestUtils.Simulate.touchEnd(rangeNode);

      assert.deepEqual(onChange.powers, [0]);
    });
  });
});

function touchEvent(clientY) {
  return {
    targetTouches: [{clientY}]
  };
}

function positionAt(node, top) {
  var height = 200;

  node.style.position = 'fixed';
  node.style.height   = height + 'px';
  node.style.top      = top + 'px';
}

function powerChangeRecorder() {
  function recordPowerChanges(power) {
    recordPowerChanges.powers.push(power);
  }

  recordPowerChanges.powers = [];
  return recordPowerChanges;
}