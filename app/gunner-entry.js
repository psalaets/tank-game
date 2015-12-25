var React = require('react');
var ReactDOM = require('react-dom');

var Gunner = require('./components/gunner/gunner');

var socket = io();
socket.on('connect', function() {
  socket.emit('type', 'gunner');
});

function turretThrottle(power) {
  socket.emit('turret-throttle', {
    power: power
  });
}

var controls = document.getElementById('controls');
ReactDOM.render(<Gunner onThrottleChange={turretThrottle}/>, controls);