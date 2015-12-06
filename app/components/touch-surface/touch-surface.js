var React = require('react');

var TouchSurface = React.createClass({
  propTypes: {
    onCursorChange: React.PropTypes.func.isRequired,
    // true to move cursor to 0,0 when touch ends, false to leave where it is
    // Default: true
    snapBack: React.PropTypes.bool
  },
  getDefaultProps() {
    return {
      snapBack: true
    };
  },
  getInitialState() {
    return {
      cursor: null
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
        {this.renderCursor(this.state)}
      </div>
    );
  },
  renderCursor(state) {
    if (!state.cursor) {
      return null;
    }

    return (
      <span>
        {state.cursor.x}, {state.cursor.y}
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
    this.calculateAndUpdateCursor(event);
  },
  handleTouchMove(event) {
    this.calculateAndUpdateCursor(event);
  },
  calculateAndUpdateCursor(touchEvent) {
    var touch = touchEvent.targetTouches[0];

    var localX = touch.clientX - this.getLeft();
    var cursorX = this.calculateCursor(localX, this.getWidth());

    var localY = touch.clientY - this.getTop();
    var cursorY = this.calculateCursor(localY, this.getHeight());

    this.updateCursor({
      x: cursorX,
      y: cursorY
    });
  },
  handleTouchEnd(event) {
    if (this.props.snapBack) {
      this.updateCursor({
        x: 0,
        y: 0
      });
    }
  },
  calculateCursor(position, size) {
    // subtract half size so touching in the middle makes value near 0
    var value = position - size / 2;

    // divide by half size to normalize
    value /= size / 2;

    // constrain for touchmoves that go way off the element
    value = Math.max(-1, value);
    value = Math.min(1, value);

    return value;
  },
  updateCursor(cursor) {
    var previousCursor = this.state.cursor;

    if (!previousCursor || cursor.x !== previousCursor.x || cursor.y !== previousCursor.y) {
      this.setState({
        cursor
      });

      this.props.onCursorChange(cursor);
    }
  }
});

module.exports = TouchSurface;