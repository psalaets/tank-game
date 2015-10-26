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
    var tanks = [{
      x: 100,
      y: 10,
      rotation: 0
    }, {
      x: 200,
      y: 10,
      rotation: 90
    }]

    ReactDOM.render(<GameBoard sprites={sprites} tanks={tanks}/>, document.getElementById('here'));
  });

