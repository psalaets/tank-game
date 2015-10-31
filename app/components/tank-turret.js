var React = require('react');

var Turret = React.createClass({
  propTypes: {
    rotation: React.PropTypes.number.isRequired
  },
  render() {
    var attributes = this.generateAttributes(this.props);

    return (
      <use xlinkHref="#tank-turret" {...attributes}/>
    );
  },
  generateAttributes(props) {
    var rotation = props.rotation;
    var rx = 134;
    var ry = 176;

    return {
      transform: `rotate(${rotation} ${rx} ${ry})`
    };
  }
});

module.exports = Turret;