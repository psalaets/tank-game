var p2 = require('p2');

module.exports = Barrel;

function Barrel(id, properties) {
  this.id = id;

  var radius = properties.radius || 150;
  var x = properties.x || 0;
  var y = properties.y || 0;

  this.body = createBody(x, y, radius);
}

function createBody(x, y, radius) {
  var body = new p2.Body({
    position: [x, y],
    // mass = 0 makes type = STATIC
    mass: 0
  });

  body.addShape(new p2.Circle({
    radius: radius
  }));

  return body;
}

Barrel.prototype = {
  toData: function() {
    return {
      id: this.id,
      x: this.body.position[0],
      y: this.body.position[1],
      radius: this.body.shapes[0].radius,
      type: 'barrel'
    };
  }
};