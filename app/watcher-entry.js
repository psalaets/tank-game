var React = require('react');
var ReactDOM = require('react-dom');
var request = require('superagent');

var main = document.getElementById('main');

var GameBoard = require('./components/game-board');

var state = {};

var socket = io();
socket.on('connect', function() {
  socket.emit('type', 'watcher');
});

socket.on('state-update', function(newState) {
  state = newState;
});

var sprites;

request
  .get('svg/sprites.json')
  .end(function(err, res) {
    if (err) {
      console.log(err);
      return;
    }

    sprites = res.body;

    requestAnimationFrame(render);
  });

function render() {
  var tanks = state.tanks || [];

  ReactDOM.render(<GameBoard sprites={sprites} tanks={tanks}/>, main);

  requestAnimationFrame(render);
}