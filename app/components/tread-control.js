var React = require('react');

var TreadControl = React.createClass({
  propTypes: {
    onChange: React.PropTypes.func
  },
  getInitialState() {
    return {
      power: 0
    };
  },
  render() {
    var touchHandlers = {
      onTouchStart: this.handleTouchStart,
      onTouchMove: this.handleTouchMove,
      onTouchEnd: this.handleTouchEnd
    };

    return (
      <div data-tread-control ref="range" {...touchHandlers}>
        {this.state.power}
      </div>
    );
  },
  getHeight() {
    return this.getBoundingClientRect().height;
  },
  getTop() {
    return this.getBoundingClientRect().top;
  },
  getBoundingClientRect() {
    return this.refs.range.getBoundingClientRect();
  },
  handleTouchStart(event) {
    var power = this.calculatePower(event.targetTouches[0]);
    this.updatePower(power);
  },
  handleTouchMove(event) {
    var power = this.calculatePower(event.targetTouches[0]);
    this.updatePower(power);
  },
  handleTouchEnd(event) {
    this.updatePower(0);
  },
  yOnThisControl(touch) {
    // touch's distance from viewport top minus div's distance from viewport top
    // is touch's y location on div
    return touch.clientY - this.getTop();
  },
  calculatePower(touch) {
    var yOnThisControl = this.yOnThisControl(touch);

    // subtract half height so touching in the middle makes power near 0
    var power = yOnThisControl - this.getHeight() / 2;

    // divide by half height to normalize
    power /= this.getHeight() / 2;

    // flip so forward is > 0 and reverse is < 0
    power = -power;

    // constrain for touchmoves that go way off the element
    power = Math.max(-1, power);
    power = Math.min(1, power);

    return power;
  },
  updatePower(power) {
    this.setState({
      power
    });

    this.props.onChange(power);
  }
});

module.exports = TreadControl;