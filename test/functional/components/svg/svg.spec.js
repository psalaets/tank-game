var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');

var assert = require('assert');

var Svg = require('../../../../app/components/svg/svg');

describe('Svg component', function() {
  var container, styles;

  beforeEach(function() {
    container = document.createElement('div');
    container.id = 'container';

    styles = document.createElement('style');
    styles.innerHTML = `
      #container {
        width: 200px;
        height: 100px;
      }

      svg {
        width: 100%;
        height: 100%;
      }
    `;

    document.body.appendChild(styles);
    document.body.appendChild(container);
  });

  afterEach(function() {
    document.body.removeChild(container);
    document.body.removeChild(styles);

    container = null;
    styles = null;
  });

  it('renders its children', function() {
    var camera = makeCamera(0, 0, 1);
    var componentInstance = ReactDOM.render(<Svg camera={camera}><rect id="foo"/></Svg>, container);
    var domNode = ReactDOM.findDOMNode(componentInstance);

    var child = domNode.children[0];

    assert.equal(child.tagName, 'rect');
    assert.equal(child.id, 'foo');
  });

  describe('on first render', function () {
    it('is hidden', function() {
      var camera = makeCamera(0, 0, 1);
      var componentInstance = ReactDOM.render(<Svg camera={camera}/>, container);
      var domNode = ReactDOM.findDOMNode(componentInstance);

      assert.equal(domNode.style.visibility, 'hidden');
    });

    it('does not set viewBox', function() {
      var camera = makeCamera(0, 0, 1);
      var componentInstance = ReactDOM.render(<Svg camera={camera}/>, container);
      var domNode = ReactDOM.findDOMNode(componentInstance);

      assert.equal(domNode.getAttribute('viewBox'), null);
    });
  });

  describe('after first render', function () {
    it('is not hidden', function() {
      var camera = makeCamera(0, 0, 1);

      ReactDOM.render(<Svg camera={camera}/>, container);
      var componentInstance = ReactDOM.render(<Svg camera={camera}/>, container);

      var domNode = ReactDOM.findDOMNode(componentInstance);

      assert.equal(domNode.style.visibility, '');
    });

    it('can set viewBox for default camera', function() {
      var camera = makeCamera(0, 0, 1);

      ReactDOM.render(<Svg camera={camera}/>, container);
      var componentInstance = ReactDOM.render(<Svg camera={camera}/>, container);

      var domNode = ReactDOM.findDOMNode(componentInstance);

      assert.equal(domNode.getAttribute('viewBox'), '-100 -50 200 100');
    });

    it('can set viewBox for zoomed in camera', function() {
      var camera = makeCamera(0, 0, 2);

      ReactDOM.render(<Svg camera={camera}/>, container);
      var componentInstance = ReactDOM.render(<Svg camera={camera}/>, container);

      var domNode = ReactDOM.findDOMNode(componentInstance);

      assert.equal(domNode.getAttribute('viewBox'), '-50 -25 100 50');
    });

    it('can set viewBox for zoomed out camera', function() {
      var camera = makeCamera(0, 0, 0.5);

      ReactDOM.render(<Svg camera={camera}/>, container);
      var componentInstance = ReactDOM.render(<Svg camera={camera}/>, container);

      var domNode = ReactDOM.findDOMNode(componentInstance);

      assert.equal(domNode.getAttribute('viewBox'), '-200 -100 400 200');
    });

    it('can set viewBox for panned camera', function() {
      var camera = makeCamera(100, 40, 1);

      ReactDOM.render(<Svg camera={camera}/>, container);
      var componentInstance = ReactDOM.render(<Svg camera={camera}/>, container);

      var domNode = ReactDOM.findDOMNode(componentInstance);

      assert.equal(domNode.getAttribute('viewBox'), '0 -10 200 100');
    });

    it('can set viewBox for zoomed and panned camera', function() {
      var camera = makeCamera(100, 40, 2);

      ReactDOM.render(<Svg camera={camera}/>, container);
      var componentInstance = ReactDOM.render(<Svg camera={camera}/>, container);

      var domNode = ReactDOM.findDOMNode(componentInstance);

      assert.equal(domNode.getAttribute('viewBox'), '50 15 100 50');
    });
  });
});

function makeCamera(x, y, zoom) {
  return {
    x,
    y,
    zoom
  };
}