var React = require('react');
var ReactDOM = require('react-dom');

var request = require('superagent');

var GameBoard = require('./components/game-board');

var Tank = require('./entities/tank');

request
  .get('svg/sprites.json')
  .end(function(err, res) {
    if (err) {
      console.log(err);
      return;
    }

    var sprites = res.body;
    var tanks = [new Tank(0, 0)].map(function(tank) {
      var {x, y, rotation} = tank;
      return {
        x,
        y,
        rotation,
        turretRotation: 0
      }
    });

    console.dir(tanks)

    ReactDOM.render(<GameBoard sprites={sprites} tanks={tanks}/>, document.getElementById('here'));
  });

