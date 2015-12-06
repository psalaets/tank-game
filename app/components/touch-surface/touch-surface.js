var React = require('react');

var TouchSurface = React.createClass({
  propTypes: {
    onPowerChange: React.PropTypes.func
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
      <div data-touch-surface ref="self" {...touchHandlers}>
        {this.renderPower(this.state)}
      </div>
    );
  },
  renderPower(state) {
    if (!state.power) {
      return null;
    }

    return (
      <span>
        {state.power.x}, {state.power.y}
      </span>
    );
  },
  getHeight() {
    return this._rect.height;
  },
  getTop() {
    return this._rect.top;
  },
  getLeft() {
    return this._rect.left;
  },
  getWidth() {
    return this._rect.width;
  },
  handleTouchStart(event) {
    this.calculateAndUpdatePower(event);
  },
  handleTouchMove(event) {
    this.calculateAndUpdatePower(event);
  },
  calculateAndUpdatePower(touchEvent) {
    var touch = touchEvent.targetTouches[0];

    var localX = touch.clientX - this.getLeft();
    var powerX = this.calculatePower(localX, this.getWidth());

    var localY = touch.clientY - this.getTop();
    var powerY = this.calculatePower(localY, this.getHeight());

    this.updatePower({
      x: powerX,
      y: powerY
    });
  },
  handleTouchEnd(event) {
    this.updatePower({
      x: 0,
      y: 0
    });
  },
  calculatePower(position, size) {
    // subtract half size so touching in the middle makes power near 0
    var power = position - size / 2;

    // divide by half size to normalize
    power /= size / 2;

    // constrain for touchmoves that go way off the element
    power = Math.max(-1, power);
    power = Math.min(1, power);

    return power;
  },
  updatePower(power) {
    var previousPower = this.state.power;

    if (!previousPower || power.x !== previousPower.x || power.y !== previousPower.y) {
      this.setState({
        power
      });

      this.props.onPowerChange(power);
    }
  }
});

module.exports = TouchSurface;