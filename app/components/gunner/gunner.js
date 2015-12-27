var React = require('react');
var TouchSurface = require('../touch-surface/touch-surface');

var Gunner = React.createClass({
  displayName: 'Gunner',
  props: {
    onThrottleChange: React.PropTypes.func.isRequired,
    onStartFiring: React.PropTypes.func.isRequired,
    onStopFiring: React.PropTypes.func.isRequired
  },
  render() {
    return (
      <div>
        <TouchSurface onCursorChange={this.handleThrottleChange}/>
        <div data-fire-button onTouchStart={this.handleTouchStart} onTouchEnd={this.handleTouchEnd}>
          fire
        </div>
      </div>
    );
  },
  handleTouchStart() {
    this.props.onStartFiring();
  },
  handleTouchEnd() {
    this.props.onStopFiring();
  },
  handleThrottleChange(cursor) {
    this.props.onThrottleChange(cursor.x);
  }
});

module.exports = Gunner;