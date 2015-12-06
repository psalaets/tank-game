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
    var localX = this.localX(event.targetTouches[0]);
    var powerX = this.calculatePower(localX, this.getWidth());

    var localY = this.localY(event.targetTouches[0]);
    var powerY = this.calculatePower(localY, this.getHeight());

    this.updatePower({
      x: powerX,
      // negate so top of the control is 1
      y: -powerY
    });
  },
  handleTouchMove(event) {
    var localX = this.localX(event.targetTouches[0]);
    var powerX = this.calculatePower(localX, this.getWidth());

    var localY = this.localY(event.targetTouches[0]);
    var powerY = this.calculatePower(localY, this.getHeight());

    this.updatePower({
      x: powerX,
      // negate so top of the control is 1
      y: -powerY
    });
  },
  handleTouchEnd(event) {
    this.updatePower({
      x: 0,
      y: 0
    });
  },
  localX(touch) {
    // touch's distance from viewport left minus div's distance from viewport left
    // is touch's x location on div
    return touch.clientX - this.getLeft();
  },
  localY(touch) {
    // touch's distance from viewport top minus div's distance from viewport top
    // is touch's y location on div
    return touch.clientY - this.getTop();
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
    var currentPower = this.state.power;

    if (!currentPower || power.x !== currentPower.x || power.y !== currentPower.y) {
      this.setState({
        power
      });

      this.props.onChange(power);
    }
  }
});

module.exports = TreadControl;