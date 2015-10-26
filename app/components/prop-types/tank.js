var React = require('react');

var type = React.PropTypes.shape({
  x: React.PropTypes.number,
  y: React.PropTypes.number,
  rotation: React.PropTypes.number
});

module.exports = type;