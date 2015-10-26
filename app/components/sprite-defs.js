var React = require('react');
var spriteMetadata = require('./prop-types/sprite-metadata');

var SpriteDefs = React.createClass({
  propTypes: {
    sprites: spriteMetadata.isRequired
  },
  render() {
    var children = this.props.sprites.map(function(sprite) {
      return (
        <g id={sprite.id} key={sprite.id} dangerouslySetInnerHTML={{__html: sprite.markup}}/>
      );
    });

    return (
      <defs>
        {children}
      </defs>
    );
  }
});

module.exports = SpriteDefs;