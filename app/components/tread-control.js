var React = require('react');

var TreadControl = React.createClass({
  propTypes: {
    onChange: React.PropTypes.func
  },
  getInitialState() {
    return {
      power: null
    };
  },
  componentDidMount() {
    var rect = this.refs.self.getBoundingClientRect();
    this._rect = {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height
    };
  },
  componentWillUnmount() {
    this._rect = null;
  },
  render() {
    var touchHandlers = {
      onTouchStart: this.handleTouchStart,
      onTouchMove: this.handleTouchMove,
      onTouchEnd: this.handleTouchEnd
    };

    return (
      <div data-tread-control ref="self" {...touchHandlers}>
        {this.state.power}
      </div>
    );
  },
  getHeight() {
    return this._rect.height;
  },
  getTop() {
    return this._rect.top;
  },
  handleTouchStart(event) {
    var localY = this.yOnThisControl(event.targetTouches[0]);
    var power = this.calculatePower(localY, this.getHeight());
    this.updatePower(power);
  },
  handleTouchMove(event) {
    var localY = this.yOnThisControl(event.targetTouches[0]);
    var power = this.calculatePower(localY, this.getHeight());
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
  calculatePower(position, size) {
    // subtract half size so touching in the middle makes power near 0
    var power = position - size / 2;

    // divide by half size to normalize
    power /= size / 2;

    // flip so forward is > 0 and reverse is < 0
    power = -power;

    // constrain for touchmoves that go way off the element
    power = Math.max(-1, power);
    power = Math.min(1, power);

    return power;
  },
  updatePower(power) {
    if (power !== this.state.power) {
      this.setState({
        power
      });

      this.props.onChange(power);
    }
  }
});

module.exports = TreadControl;