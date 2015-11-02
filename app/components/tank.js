var React = require('react');

var Turret = require('./tank-turret');
var Body = require('./tank-body');
var svg = require('./helpers/svg');

var Tank = React.createClass({
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
    var rx = 134;
    var ry = 176;

    var transformParts = {
      x, y, rotation, rx, ry
    };

    return {
      transform: svg.transform(transformParts)
    };
  }
});

module.exports = Tank;