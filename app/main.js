var React = require('react');
var ReactDOM = require('react-dom');

var request = require('superagent');

var Svg = require('./components/svg');

request
  .get('svg/sprites.json')
  .end(function(err, res) {
    var spriteDefs = res.body;

    ReactDOM.render(<Svg spriteDefs={spriteDefs}/>, document.getElementById('here'));
  });

