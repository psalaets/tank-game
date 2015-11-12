var p2 = require('@psalaets/p2');

module.exports = Tank;

var maxThrottleForce = 1;
var noThrottleBrakeForce = 2;

function Tank(x, y) {
  this.body = createBody(x, y);
  this.vehicle = createVehicle(this.body);
  this.leftTread = addTread(this.vehicle, -1, 0);
  this.rightTread = addTread(this.vehicle, 1, 0);
}

function createBody(x, y) {
  var chassisBody = new p2.Body({
    mass: 1,
    position: [x, y]
  });

  chassisBody.addShape(new p2.Box({
    width: 20,
    height: 20
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

  tread.setSideFriction(5);
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