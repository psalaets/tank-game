var React = require('react');

var Tank = React.createClass({
  propTypes: {
    x: React.PropTypes.number.isRequired,
    y: React.PropTypes.number.isRequired,
    // degrees
    rotation: React.PropTypes.number.isRequired
  },
  render() {
    var {x, y, rotation} = this.props;
    var props = {
      transform: `translate(${x} ${y}) rotate(${rotation})`
    };

    return (
      <g {...props}>
         <use xlinkHref="#tank-body"/>
         <use xlinkHref="#tank-turrent"/>
      </g>
    );
  }
});

module.exports = Tank;