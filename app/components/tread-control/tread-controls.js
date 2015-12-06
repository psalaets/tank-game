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
    // negate so up is 1
    var y = -power.y;
    this.props.onLeftChange(y);
  },
  handleRightChange(power) {
    // negate so up is 1
    var y = -power.y;
    this.props.onRightChange(y);
  }
});

module.exports = TreadControls;