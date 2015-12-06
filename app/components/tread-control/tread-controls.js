var React = require('react');

var TouchSurface = require('../touch-surface/touch-surface');

var TreadControls = React.createClass({
  propTypes: {
    onLeftChange: React.PropTypes.func,
    onRightChange: React.PropTypes.func
  },
  getDefaultProps() {
    return {
      onLeftChange: function() {},
      onRightChange: function() {}
    };
  },
  render() {
    return (
      <div data-tread-controls>
        <TouchSurface onPowerChange={this.handleLeftChange}/>
        <TouchSurface onPowerChange={this.handleRightChange}/>
      </div>
    );
  },
  handleLeftChange(power) {
    this.props.onLeftChange(power);
  },
  handleRightChange(power) {
    this.props.onRightChange(power);
  }
});

module.exports = TreadControls;