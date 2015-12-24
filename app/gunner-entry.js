var React = require('react');
var ReactDOM = require('react-dom');

var socket = io();
socket.on('connect', function() {
  socket.emit('type', 'gunner');
});

function turretThrottle(power) {
  socket.emit('turret-throttle', {
    power: power
  });
}

var direction = 1;

setInterval(function() {
  direction = (Math.random() * 2) - 1;
  console.log('direction', direction);

  turretThrottle(direction);
}, 1000);

var controls = document.getElementById('controls');
// TODO render gunner controls