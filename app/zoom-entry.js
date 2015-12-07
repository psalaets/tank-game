var React = require('react');
var ReactDOM = require('react-dom');

var Svg = require('./components/svg/svg');

var main = document.getElementById('main');

var camera = {
  x: 250,
  y: 200,
  zoom: 1
};

function handleZoomChange(event) {
  camera.zoom = event.target.value;

  requestAnimationFrame(render);
}

requestAnimationFrame(render);

function render() {
  var page = (
    <div>
      <div>
        <input type="range" min="0.1" max="5" defaultValue="1" step="0.1" onChange={handleZoomChange}/>
        {camera.zoom}
      </div>
      <Svg camera={camera}>
        <circle cx="250" cy="200" r="20"/>
      </Svg>
    </div>
  );

  ReactDOM.render(page, main);
}