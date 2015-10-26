var React = require('react');

var type = React.PropTypes.arrayOf(
  React.PropTypes.shape({
    id: React.PropTypes.string,
    markup: React.PropTypes.string
  })
);

module.exports = type;