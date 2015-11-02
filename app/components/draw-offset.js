var React = require('react');

var svg = require('./helpers/svg');

/**
 * Helper component that shifts its children around.
 */
var DrawOffset = React.createClass({
  propTypes: {
    x: React.PropTypes.number,
    y: React.PropTypes.number
  },
  getDefaultProps() {
    return {
      x: 0,
      y: 0
    };
  },
  render() {
    var attributes = this.generateAttributes(this.props);

    return (
      <g {...attributes}>
        {this.props.children}
      </g>
    );
  },
  generateAttributes(props) {
    var {x, y} = props;

    return {
      transform: svg.transform({x, y})
    };
  }
});

module.exports = DrawOffset;