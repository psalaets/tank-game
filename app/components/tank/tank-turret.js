var React = require('react');

var DrawOffset = require('../draw-offset');

var Turret = React.createClass({
  propTypes: {
    rotation: React.PropTypes.number.isRequired
  },
  render() {
    var attributes = this.generateAttributes(this.props);

    var offsets = {
      x: 24,
      y: -25
    };

    return (
      <DrawOffset {...offsets}>
        <use xlinkHref="#tank-turret" {...attributes}/>
      </DrawOffset>
    );
  },
  generateAttributes(props) {
    var rotation = props.rotation;

    var rx = 100;
    var ry = 180;

    return {
      transform: `rotate(${rotation} ${rx} ${ry})`
    };
  }
});

module.exports = Turret;