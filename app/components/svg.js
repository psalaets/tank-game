var React = require('react');

var SpriteDefs = require('./sprite-defs');
var Tank = require('./tank');
var defs = require('./prop-types/defs');

var Svg = React.createClass({
  propTypes: {
    spriteDefs: defs.isRequired
  },
  render() {
    var tankProps = {
      x: 100,
      y: 10,
      rotation: 0
    };

    return (
      <svg width="800" height="600">
        <SpriteDefs defs={this.props.spriteDefs}/>
        <Tank {...tankProps}/>
      </svg>
    );
  }
});

module.exports = Svg;