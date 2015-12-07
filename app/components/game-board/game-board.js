var React = require('react');

var Svg = require('../svg/svg');
var SpriteDefs = require('../sprite-defs/sprite-defs');
var Tank = require('../tank/tank');

var spriteMetadata = require('../prop-types/sprite-metadata');
var tank = require('../prop-types/tank');

var GameBoard = React.createClass({
  propTypes: {
    sprites: spriteMetadata.isRequired,
    tanks: React.PropTypes.arrayOf(tank)
  },
  render() {
    var tanks = this.props.tanks.map(function(tankProps) {
      return (
        <Tank key={tankProps.id} {...tankProps}/>
      );
    });

    var camera = {
      x: 400,
      y: 300,
      zoom: 0.25
    };

    return (
      <Svg camera={camera}>
        <SpriteDefs sprites={this.props.sprites}/>
        {tanks}
      </Svg>
    );
  }
});

module.exports = GameBoard;