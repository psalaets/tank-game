var React = require('react');

var type = React.PropTypes.shape({
  id: React.PropTypes.number.isRequired,
  x: React.PropTypes.number,
  y: React.PropTypes.number,
  rotation: React.PropTypes.number
});

module.exports = type;