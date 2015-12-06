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
        <TouchSurface onCursorChange={this.handleLeftChange}/>
        <TouchSurface onCursorChange={this.handleRightChange}/>
      </div>
    );
  },
  handleLeftChange(cursor) {
    // negate so up is 1
    var y = -cursor.y;
    this.props.onLeftChange(y);
  },
  handleRightChange(cursor) {
    // negate so up is 1
    var y = -cursor.y;
    this.props.onRightChange(y);
  }
});

module.exports = TreadControls;