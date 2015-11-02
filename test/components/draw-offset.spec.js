var assert = require('assert');
var React = require('react');
var TestUtils = require('react-addons-test-utils');

var DrawOffset = require('../../app/components/draw-offset');

describe('DrawOffset component', function () {
  it('renders g element', function() {
    var renderOutput = shallowRender(DrawOffset, {x: 1, y: 2}, 'child');

    assert.equal(renderOutput.type, 'g');
  });

  it('translates by the draw offset', function() {
    var renderOutput = shallowRender(DrawOffset, {x: 1, y: 2}, 'child');

    assert.equal(renderOutput.props.transform, 'translate(1 2)');
  });

  it('render its children', function() {
    var renderOutput = shallowRender(DrawOffset, {x: 1, y: 2}, 'child');

    assert.equal(renderOutput.props.children, 'child');
  });
});

function shallowRender(component, props, ...children) {
  var element = React.createElement(component, props, ...children);

  var shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(element);
  return shallowRenderer.getRenderOutput();
}