var React = require('react');
var ReactDOM = require('react-dom');
var request = require('superagent');

var join = require('./commands').join;
var GameBoard = require('./components/game-board/game-board');

var main = document.getElementById('main');
var state = {};

var socket = io();
socket.on('connect', function() {
  socket.emit('command', join('watcher'));
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
  var props = {
    tanks: state.tanks || [],
    shells: state.shells || [],
    obstacles: state.obstacles || [],
    sprites: sprites
  };

  ReactDOM.render(<GameBoard {...props}/>, main);

  requestAnimationFrame(render);
}