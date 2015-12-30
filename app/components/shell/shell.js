var React = require('react');

var Shell = React.createClass({
  displayName: 'Shell',
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

module.exports = Shell;