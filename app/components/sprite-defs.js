var React = require('react');

var SpriteDefs = React.createClass({
  propTypes: {
    defs: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        id: React.PropTypes.string,
        markup: React.PropTypes.string
      })
    ).isRequired
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