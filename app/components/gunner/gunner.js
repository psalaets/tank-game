var React = require('react');
var TouchSurface = require('../touch-surface/touch-surface');

var Gunner = React.createClass({
  displayName: 'Gunner',
  props: {
    onThrottleChange: React.PropTypes.func.isRequired
  },
  render() {
    return <TouchSurface onCursorChange={this.handleThrottleChange}/>
  },
  handleThrottleChange(cursor) {
    this.props.onThrottleChange(cursor.x);
  }
});

module.exports = Gunner;