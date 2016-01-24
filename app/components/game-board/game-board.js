var React = require('react');

var Svg = require('../svg/svg');
var SpriteDefs = require('../sprite-defs/sprite-defs');
var Tank = require('../tank/tank');
var Shell = require('../shell/shell');
var Barrel = require('../barrel/barrel');

var spriteMetadata = require('../prop-types/sprite-metadata');
var tank = require('../prop-types/tank');

var GameBoard = React.createClass({
  displayName: 'GameBoard',
  propTypes: {
    sprites: spriteMetadata.isRequired,
    tanks: React.PropTypes.arrayOf(tank),
    shells: React.PropTypes.arrayOf(React.PropTypes.shape({
      x: React.PropTypes.number,
      y: React.PropTypes.number,
      radius: React.PropTypes.number
    })),
    obstacles: React.PropTypes.array
  },
  render() {
    var tanks = this.renderTanks();
    var shells = this.renderShells();
    var obstacles = this.renderObstacles();

    var camera = {
      x: 400,
      y: 300,
      zoom: 0.25
    };

    return (
      <Svg camera={camera}>
        <SpriteDefs sprites={this.props.sprites}/>
        {tanks}
        {shells}
        {obstacles}
      </Svg>
    );
  },
  renderTanks() {
    return this.props.tanks.map(function(tankProps) {
      return <Tank key={tankProps.id} {...tankProps}/>;
    });
  },
  renderShells() {
    return this.props.shells.map(function(shellProps) {
      return <Shell key={shellProps.id} {...shellProps}/>
    });
  },
  renderObstacles() {
    return this.props.obstacles.map(function(obstacle) {
      return <Barrel key={obstacle.id} {...obstacle}/>;
    });
  }
});

module.exports = GameBoard;