var React = require('react');

var SpriteDefs = require('./sprite-defs');
var Tank = require('./tank');
var spriteMetadata = require('./prop-types/sprite-metadata');

var GameBoard = React.createClass({
  propTypes: {
    sprites: spriteMetadata.isRequired
  },
  render() {
    var tankProps = {
      x: 100,
      y: 10,
      rotation: 0
    };

    return (
      <svg width="800" height="600">
        <SpriteDefs sprites={this.props.sprites}/>
        <Tank {...tankProps}/>
      </svg>
    );
  }
});

module.exports = GameBoard;