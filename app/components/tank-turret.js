var React = require('react');

var Turret = React.createClass({
  propTypes: {
    rotation: React.PropTypes.number.isRequired
  },
  render() {
    var attributes = this.generateAttributes(this.props);

    return (
      <g transform="translate(24 -25)">
        <use xlinkHref="#tank-turret" {...attributes}/>
      </g>
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