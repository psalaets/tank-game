var React = require('react');
var ReactDOM = require('react-dom');
var TreadControls = require('./components/tread-control/tread-controls');

var socket = io();
socket.on('connect', function() {
  socket.emit('type', 'driver');
});

function leftThrottle(power) {
  socket.emit('left-throttle', {
    power: power
  });
}

function rightThrottle(power) {
  socket.emit('right-throttle', {
    power: power
  });
}

var controls = document.getElementById('controls');
ReactDOM.render(<TreadControls onLeftChange={leftThrottle} onRightChange={rightThrottle}/>, controls);