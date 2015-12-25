var React = require('react');

var Turret = require('./tank-turret');
var Body = require('./tank-body');

var svg = require('../helpers/svg');

// these magic numbers depend on the sprite
var spriteWidth = 248;
var spriteHeight = 312;

var Tank = React.createClass({
  displayName: 'Tank',
  propTypes: {
    x: React.PropTypes.number.isRequired,
    y: React.PropTypes.number.isRequired,
    // degrees
    rotation: React.PropTypes.number.isRequired,
    turretRotation: React.PropTypes.number.isRequired
  },
  render() {
    var attributes = this.generateAttributes(this.props);
    var turretRotation = this.props.turretRotation;

    return (
      <g {...attributes}>
        <Body/>
        <Turret rotation={turretRotation}/>
      </g>
    );
  },
  generateAttributes(props) {
    var {x, y, rotation} = props;
    // move position by half of sprite size to center sprite on actual position
    x -= spriteWidth / 2;
    y -= spriteHeight / 2;

    var rx = spriteWidth / 2;
    var ry = spriteHeight / 2;

    var transformParts = {
      x, y, rotation, rx, ry
    };

    return {
      transform: svg.transform(transformParts)
    };
  }
});

module.exports = Tank;