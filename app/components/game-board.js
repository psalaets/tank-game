var React = require('react');

var SpriteDefs = require('./sprite-defs');
var Tank = require('./tank');

var spriteMetadata = require('./prop-types/sprite-metadata');
var tank = require('./prop-types/tank');

var GameBoard = React.createClass({
  propTypes: {
    sprites: spriteMetadata.isRequired,
    tanks: React.PropTypes.arrayOf(tank)
  },
  render() {
    var tanks = this.props.tanks.map(function(tankProps) {
      return (
        <Tank {...tankProps}/>
      );
    });

    return (
      <svg width="100%" height="400px" >
        <SpriteDefs sprites={this.props.sprites}/>
        {tanks}
      </svg>
    );
  }
});

module.exports = GameBoard;