var React = require('react');
var ReactDOM = require('react-dom');
var TreadControls = require('./components/tread-control/tread-controls');

var {join, leftThrottle, rightThrottle} = require('./commands');

var socket = io();
socket.on('connect', function() {
  socket.emit('command', join('driver'));
});

function onLeftThrottle(power) {
  socket.emit('command', leftThrottle(power));
}

function onRightThrottle(power) {
  socket.emit('command', rightThrottle(power));
}

var controls = document.getElementById('controls');
ReactDOM.render(<TreadControls onLeftChange={onLeftThrottle} onRightChange={onRightThrottle}/>, controls);