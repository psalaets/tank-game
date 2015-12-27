var p2 = require('@psalaets/p2');

module.exports = Shell;

function Shell(id, properties) {
  this.id = id;

  properties = properties || {};

  this.radius = 50;
  var x = properties.x || 0;
  var y = properties.y || 0;

  this.body = createBody(x, y, this.radius);
}

function createBody(x, y, radius) {
  var body = new p2.Body({
    mass: 1,
    position: [x, y]
  });

  body.addShape(new p2.Circle({
    radius: radius
  }));

  return body;
}

Shell.prototype = {
  update: function(deltaSeconds) {

  },
  /**
  * @param {vec2} aimVector - Normalized aim vector
  */
  launch: function(aimVector) {
    // somethings per second?
    var speed = 300;
    var velocity = aimVector.multiply(speed, true);

    this.body.velocity = [velocity.x, velocity.y];
  },
  toData: function() {
    return {
      id: this.id,
      x: this.x,
      y: this.y,
      radius: this.radius
    };
  }
};

Object.defineProperties(Shell.prototype, {
  x: {
    get: function() {
      return this.body.position[0];
    }
  },
  y: {
    get: function() {
      return this.body.position[1];
    }
  }
});