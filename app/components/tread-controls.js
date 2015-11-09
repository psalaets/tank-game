var React = require('react');

var TreadControl = require('./tread-control');

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
        <TreadControl onChange={this.handleLeftChange}/>
        <TreadControl onChange={this.handleRightChange}/>
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