var React = require('react');
var ReactDOM = require('react-dom');

var request = require('superagent');

var GameBoard = require('./components/game-board');

request
  .get('svg/sprites.json')
  .end(function(err, res) {
    if (err) {
      console.log(err);
      return;
    }

    var sprites = res.body;
    ReactDOM.render(<GameBoard sprites={sprites}/>, document.getElementById('here'));
  });

