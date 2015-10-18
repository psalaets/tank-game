var React = require('react');
var defs = require('./prop-types/defs');

var SpriteDefs = React.createClass({
  propTypes: {
    defs: defs.isRequired
  },
  render() {
    var children = this.props.defs.map(function(def) {
      return (
        <g id={def.id} key={def.id} dangerouslySetInnerHTML={{__html: def.markup}}/>
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