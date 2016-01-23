var React = require('react');
var ReactDOM = require('react-dom');

var Gunner = require('./components/gunner/gunner');

var {join, turretThrottle, startFiring, stopFiring} = require('./commands');

var socket = io();
socket.on('connect', function() {
  socket.emit('command', join('gunner'));
});

function onThrottleChange(power) {
  socket.emit('command', turretThrottle(power));
}

function onStartFiring() {
  socket.emit('command', startFiring());
}

function onStopFiring() {
  socket.emit('command', stopFiring());
}

var controls = document.getElementById('controls');

var props = {
  onStartFiring,
  onStopFiring,
  onThrottleChange
};

ReactDOM.render(<Gunner {...props}/>, controls);