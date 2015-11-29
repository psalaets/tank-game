var p2 = require('@psalaets/p2');

module.exports = Tank;

var maxThrottleForce = 30;
var noThrottleBrakeForce = 60;

function Tank(id, x, y) {
  var width = 230;
  var height = 300;

  this.id = id;

  this.body = createBody(x, y, width, height);
  this.vehicle = createVehicle(this.body);
  this.leftTread = addTread(this.vehicle, -width / 2, 0);
  this.rightTread = addTread(this.vehicle, width / 2, 0);
}

function createBody(x, y, width, height) {
  var chassisBody = new p2.Body({
    mass: 1,
    position: [x, y]
  });

  chassisBody.angularDamping = 0.5;
  chassisBody.damping = 0.5;

  chassisBody.addShape(new p2.Box({
    width: width,
    height: height
  }));
  return chassisBody;
}

function createVehicle(chassisBody) {
  return new p2.TopDownVehicle(chassisBody);
}

function addTread(vehicle, localX, localY) {
  var tread = vehicle.addWheel({
    localPosition: [localX, localY]
  });

  tread.setSideFriction(50);
  return tread;
}

Tank.prototype = {
  /**
  * @param {Number} amount - Value in [-1, 1]
  */
  leftThrottle: function(amount) {
    if (amount == 0) {
      this.leftTread.setBrakeForce(noThrottleBrakeForce);
    } else {
      this.leftTread.setBrakeForce(0);
    }

    this.leftTread.engineForce = amount * maxThrottleForce;
  },
  /**
  * @param {Number} amount - Value in [-1, 1]
  */
  rightThrottle: function(amount) {
    if (amount == 0) {
      this.rightTread.setBrakeForce(noThrottleBrakeForce);
    } else {
      this.rightTread.setBrakeForce(0);
    }

    this.rightTread.engineForce = amount * maxThrottleForce;
  },
  /**
  * Helper to add tank to p2.
  *
  * @param {p2.World} world
  */
  addToWorld: function(world) {
    world.addBody(this.body);
    this.vehicle.addToWorld(world);
  },
  /**
  * Helper to remove tank from p2.
  *
  * @param {p2.World} world
  */
  removeFromWorld: function(world) {
    world.removeBody(this.body);
    this.vehicle.removeFromWorld(world);
  }
};

Object.defineProperties(Tank.prototype, {
  rotation: {
    get: function() {
      var angle = normalizeAngle(this.body.angle);
      return radiansToDegrees(angle);
    }
  },
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

function normalizeAngle(angle){
  angle = angle % (2 * Math.PI);
  if (angle < 0) {
    angle += (2 * Math.PI);
  }
  return angle;
}

function radiansToDegrees(radians) {
  return radians * 180 / Math.PI;
}