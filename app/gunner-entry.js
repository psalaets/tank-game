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

function startFiring() {
  socket.emit('start-firing');
}

function stopFiring() {
  socket.emit('stop-firing');
}

var controls = document.getElementById('controls');

var props = {
  onStartFiring: startFiring,
  onStopFiring: stopFiring,
  onThrottleChange: turretThrottle
};

ReactDOM.render(<Gunner {...props}/>, controls);