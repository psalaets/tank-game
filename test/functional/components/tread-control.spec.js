var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');

var assert = require('assert');

var TreadControl = require('../../../app/components/tread-control/tread-control');

describe('TreadControl component', function() {
  var testArea, styles;

  var top = 100;
  var height = 200;
  var left = 50;
  var width = 20;
  var bottom = top + height;
  var right = left + width;
  // viewport relative point that is in middle of the control
  var midX = left + (width / 2);
  var midY = top + (height / 2);

  beforeEach(function() {
    testArea = document.createElement('div');
    testArea.id = 'test-area';

    styles = document.createElement('style');
    styles.innerHTML = `
      [data-tread-control] {
        position: fixed;

        top: ${top}px;
        height: ${height}px;

        left: ${left}px;
        width: ${width}px;
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

  var touchingTestCases = [
    // touch x, touch y, power x, power y, location name
    [left, top, -1, 1, 'top/left'],
    [midX, top, 0, 1, 'top/center'],
    [right, top, 1, 1, 'top/right'],

    [left, midY, -1, 0, 'middle/left'],
    [midX, midY, 0, 0, 'middle/center'],
    [right, midY, 1, 0, 'middle/right'],

    [left, bottom, -1, -1, 'bottom/left'],
    [midX, bottom, 0, -1, 'bottom/center'],
    [right, bottom, 1, -1, 'bottom/right']
  ];

  describe('on touchstart event', function() {
    touchingTestCases.forEach(function(testCase) {
      var [touchX, touchY, powerX, powerY, location] = testCase;

      it('sets power for event at ' + location, function() {
        var onChange = powerChangeRecorder();
        var componentInstance = ReactDOM.render(<TreadControl onChange={onChange}/>, testArea);
        var domNode = ReactDOM.findDOMNode(componentInstance);

        TestUtils.Simulate.touchStart(domNode, touchEvent(touchX, touchY));

        assert.deepEqual(onChange.powers, [{x: powerX, y: powerY}]);
      });
    });
  });

  describe('on touchmove event', function() {
    touchingTestCases.forEach(function(testCase) {
      var [touchX, touchY, powerX, powerY, location] = testCase;

      it('sets power for event at ' + location, function() {
        var onChange = powerChangeRecorder();
        var componentInstance = ReactDOM.render(<TreadControl onChange={onChange}/>, testArea);
        var domNode = ReactDOM.findDOMNode(componentInstance);

        TestUtils.Simulate.touchMove(domNode, touchEvent(touchX, touchY));

        assert.deepEqual(onChange.powers, [{x: powerX, y: powerY}]);
      });
    });

    describe('multiple events', function() {
      it('changes power multiple times', function() {
        var onChange = powerChangeRecorder();
        var componentInstance = ReactDOM.render(<TreadControl onChange={onChange}/>, testArea);
        var domNode = ReactDOM.findDOMNode(componentInstance);

        TestUtils.Simulate.touchMove(domNode, touchEvent(midX, 100));
        TestUtils.Simulate.touchMove(domNode, touchEvent(midX, 200));
        TestUtils.Simulate.touchMove(domNode, touchEvent(midX, 300));

        assert.deepEqual(onChange.powers, [
          {x: 0, y: 1},
          {x: 0, y: 0},
          {x: 0, y: -1}
        ]);
      });

      it('does not call onChange consecutive times with same power', function() {
        var onChange = powerChangeRecorder();
        var componentInstance = ReactDOM.render(<TreadControl onChange={onChange}/>, testArea);
        var domNode = ReactDOM.findDOMNode(componentInstance);

        TestUtils.Simulate.touchMove(domNode, touchEvent(midX, 0));
        TestUtils.Simulate.touchMove(domNode, touchEvent(midX, 1));
        TestUtils.Simulate.touchMove(domNode, touchEvent(midX, 2));

        assert.deepEqual(onChange.powers, [
          {x: 0, y: 1}
        ]);
      });
    });
  });

  describe('on touchend event', function() {
    it('changes power to zero', function() {
      var onChange = powerChangeRecorder();
      var componentInstance = ReactDOM.render(<TreadControl onChange={onChange}/>, testArea);
      var domNode = ReactDOM.findDOMNode(componentInstance);

      TestUtils.Simulate.touchEnd(domNode);

      assert.deepEqual(onChange.powers, [{x: 0, y: 0}]);
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