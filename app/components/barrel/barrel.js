var React = require('react');

var Barrel = React.createClass({
  displayName: 'Barrel',
  propTypes: {
    x: React.PropTypes.number,
    y: React.PropTypes.number,
    radius: React.PropTypes.number
  },
  render() {
    var {x, y, radius} = this.props;

    return (
      <circle cx={x} cy={y} r={radius} fill="black"/>
    );
  }
});

module.exports = Barrel;