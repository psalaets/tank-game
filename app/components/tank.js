var React = require('react');

var Tank = React.createClass({
  propTypes: {
    x: React.PropTypes.number.isRequired,
    y: React.PropTypes.number.isRequired,
    // degrees
    rotation: React.PropTypes.number.isRequired
  },
  render() {
    var attributes = this.generateAttributes(this.props);

    return (
      <g {...attributes}>
         <use xlinkHref="#tank-body"/>
         <use xlinkHref="#tank-turret"/>
      </g>
    );
  },
  generateAttributes: function(props) {
    var {x, y, rotation} = props;

    return {
      transform: `translate(${x} ${y}) rotate(${rotation})`
    };
  }
});

module.exports = Tank;