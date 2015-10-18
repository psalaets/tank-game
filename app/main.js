var React = require('react');
var ReactDOM = require('react-dom');

var Tank = require('./components/tank');

var tankProps = {
  x: 200,
  y: 100,
  rotation: 45
};

var tankSvg = document.getElementById('tank')
ReactDOM.render(<Tank {...tankProps}/>, tankSvg);
