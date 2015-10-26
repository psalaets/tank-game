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

    var spriteDefs = res.body;
    ReactDOM.render(<GameBoard spriteDefs={spriteDefs}/>, document.getElementById('here'));
  });

