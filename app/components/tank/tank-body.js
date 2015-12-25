var React = require('react');

var TankBody = React.createClass({
  displayName: 'TankBody',
  render() {
    return (
      <use xlinkHref="#tank-body"/>
    );
  }
});

module.exports = TankBody;