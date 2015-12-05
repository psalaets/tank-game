var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');

var assert = require('assert');

var TreadControl = require('../../../app/components/tread-control/tread-control');

describe('TreadControl component', function() {
  var testArea, styles;

  beforeEach(function() {
    testArea = document.createElement('div');
    testArea.id = 'test-area';

    styles = document.createElement('style');
    styles.innerHTML = `
      [data-tread-control] {
        position: fixed;
        top: 100px;
        height: 200px;
      }
    `;

    document.body.appendChild(styles);
    document.body.appendChild(testArea);
  });

  afterEach(function() {
    document.body.removeChild(testArea);
    document.body.removeChild(styles);

    testArea = null;
    styles = null;
  });

  describe('on touchstart event', function() {
    describe('at top of control', function() {
      it('sets y power to 1', function() {
        var onChange = powerChangeRecorder();
        var componentInstance = ReactDOM.render(<TreadControl onChange={onChange}/>, testArea);
        var domNode = ReactDOM.findDOMNode(componentInstance);

        TestUtils.Simulate.touchStart(domNode, touchEvent(0, 100));

        assert.deepEqual(onChange.powers, [1]);
      });
    });

    describe('in middle of control', function() {
      it('sets power to 0', function() {
        var onChange = powerChangeRecorder();
        var componentInstance = ReactDOM.render(<TreadControl onChange={onChange}/>, testArea);
        var domNode = ReactDOM.findDOMNode(componentInstance);

        TestUtils.Simulate.touchStart(domNode, touchEvent(0, 200));

        assert.deepEqual(onChange.powers, [0]);
      });
    });

    describe('at bottom of control', function() {
      it('sets power to -1', function() {
        var onChange = powerChangeRecorder();
        var componentInstance = ReactDOM.render(<TreadControl onChange={onChange}/>, testArea);
        var domNode = ReactDOM.findDOMNode(componentInstance);

        TestUtils.Simulate.touchStart(domNode, touchEvent(0, 300));

        assert.deepEqual(onChange.powers, [-1]);
      });
    });
  });

  describe('on touchmove event', function() {
    describe('above control', function() {
      it('sets power to 1', function() {
        var onChange = powerChangeRecorder();
        var componentInstance = ReactDOM.render(<TreadControl onChange={onChange}/>, testArea);
        var domNode = ReactDOM.findDOMNode(componentInstance);

        TestUtils.Simulate.touchMove(domNode, touchEvent(0, 0));

        assert.deepEqual(onChange.powers, [1]);
      });
    });

    describe('on upper half of control', function() {
      it('sets power to a positive number', function() {
        var onChange = powerChangeRecorder();
        var componentInstance = ReactDOM.render(<TreadControl onChange={onChange}/>, testArea);
        var domNode = ReactDOM.findDOMNode(componentInstance);

        TestUtils.Simulate.touchMove(domNode, touchEvent(0, 150));

        assert.deepEqual(onChange.powers, [0.5]);
      });
    });

    describe('on lower half of control', function() {
      it('sets power to a negative number', function() {
        var onChange = powerChangeRecorder();
        var componentInstance = ReactDOM.render(<TreadControl onChange={onChange}/>, testArea);
        var domNode = ReactDOM.findDOMNode(componentInstance);

        TestUtils.Simulate.touchMove(domNode, touchEvent(0, 250));

        assert.deepEqual(onChange.powers, [-0.5]);
      });
    });

    describe('below control', function () {
      it('sets power to -1', function() {
        var onChange = powerChangeRecorder();
        var componentInstance = ReactDOM.render(<TreadControl onChange={onChange}/>, testArea);
        var domNode = ReactDOM.findDOMNode(componentInstance);

        TestUtils.Simulate.touchMove(domNode, touchEvent(0, 500));

        assert.deepEqual(onChange.powers, [-1]);
      });
    });

    describe('multiple events', function() {
      it('changes power multiple times', function() {
        var onChange = powerChangeRecorder();
        var componentInstance = ReactDOM.render(<TreadControl onChange={onChange}/>, testArea);
        var domNode = ReactDOM.findDOMNode(componentInstance);

        TestUtils.Simulate.touchMove(domNode, touchEvent(0, 100));
        TestUtils.Simulate.touchMove(domNode, touchEvent(0, 200));
        TestUtils.Simulate.touchMove(domNode, touchEvent(0, 300));

        assert.deepEqual(onChange.powers, [1, 0, -1]);
      });

      it('does not call onChange consecutive times with same power', function() {
        var onChange = powerChangeRecorder();
        var componentInstance = ReactDOM.render(<TreadControl onChange={onChange}/>, testArea);
        var domNode = ReactDOM.findDOMNode(componentInstance);

        TestUtils.Simulate.touchMove(domNode, touchEvent(0, 0));
        TestUtils.Simulate.touchMove(domNode, touchEvent(0, 1));
        TestUtils.Simulate.touchMove(domNode, touchEvent(0, 2));

        // this used to result in [1, 1, 1]
        assert.deepEqual(onChange.powers, [1]);
      });
    });
  });

  describe('on touchend event', function() {
    it('changes power to zero', function() {
      var onChange = powerChangeRecorder();
      var componentInstance = ReactDOM.render(<TreadControl onChange={onChange}/>, testArea);
      var domNode = ReactDOM.findDOMNode(componentInstance);

      TestUtils.Simulate.touchEnd(domNode);

      assert.deepEqual(onChange.powers, [0]);
    });
  });
});

function touchEvent(clientX, clientY) {
  return {
    targetTouches: [{
      clientX,
      clientY
    }]
  };
}

function powerChangeRecorder() {
  function recordPowerChanges(power) {
    recordPowerChanges.powers.push(power);
  }

  recordPowerChanges.powers = [];
  return recordPowerChanges;
}