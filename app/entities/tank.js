var p2 = require('@psalaets/p2');
var vec2 = require('vec2');

module.exports = Tank;

var maxThrottleForce = 45;
var noThrottleBrakeForce = 90;

// degrees per second
var maxTurretRotationSpeed = 45;

/**
* Create a tank.
*
* @param {Number} id - game-unique id for the tank
* @param {Object} properties - object of initial properties for the tank.
*        allowed properties: x, y, rotation
*/
function Tank(id, properties) {
  var width = 230;
  var height = 300;

  this.id = id;

  properties = properties || {};
  var x = properties.x || 0;
  var y = properties.y || 0;
  var rotation = properties.rotation || 0;
  this.turretRotation = properties.turretRotation || 0;
  this.turretThrottle = 0;

  this.body = createBody(x, y, width, height, degreesToRadians(rotation));
  this.vehicle = createVehicle(this.body);
  this.leftTread = addTread(this.vehicle, -width / 2, 0);
  this.rightTread = addTread(this.vehicle, width / 2, 0);
}

/**
* Create a p2.Body
*
* @param {Number} x
* @param {Number} y
* @param {Number} width
* @param {Number} height
* @param {Number} rotation - Initial rotation in radians
* @return {p2.Body}
*/
function createBody(x, y, width, height, rotation) {
  var chassisBody = new p2.Body({
    mass: 1,
    position: [x, y],
    angle: rotation
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
  * @param {Number} deltaSeconds - How many seconds have elapsed since last update.
  */
  update: function(deltaSeconds) {
    this.turretRotation += this.turretThrottle * maxTurretRotationSpeed * deltaSeconds;
    this.turretRotation = normalizeDegrees(this.turretRotation);
  },
  /**
  * @param {Number} amount - Value in [-1, 1]
  */
  setLeftThrottle: function(amount) {
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
  setRightThrottle: function(amount) {
    if (amount == 0) {
      this.rightTread.setBrakeForce(noThrottleBrakeForce);
    } else {
      this.rightTread.setBrakeForce(0);
    }

    this.rightTread.engineForce = amount * maxThrottleForce;
  },
  /**
  * @param {Number} amount - Value in [-1, 1]
  */
  setTurretThrottle: function(amount) {
    this.turretThrottle = amount;
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
  },
  /**
  * @return {Object} containing raw data properties of this tank
  */
  toData: function() {
    return {
      id: this.id,
      x: this.x,
      y: this.y,
      rotation: this.rotation,
      turretRotation: this.turretRotation
    };
  }
};

Object.defineProperties(Tank.prototype, {
  rotation: {
    get: function() {
      var angle = normalizeRadians(this.body.angle);
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
  },
  aimVector: {
    get: function() {
      var aimVector = vec2(0, -1);

      // rotate by tank rotation
      aimVector.rotate(this.body.angle);

      // rotate by turret rotation
      aimVector.rotate(degreesToRadians(this.turretRotation));

      return aimVector;
    }
  }
});

function normalizeRadians(angle) {
  angle = angle % (2 * Math.PI);
  if (angle < 0) {
    angle += (2 * Math.PI);
  }
  return angle;
}

function normalizeDegrees(angle) {
  angle = angle % 360;
  if (angle < 0) {
    angle += 360;
  }
  return angle;
}

function radiansToDegrees(radians) {
  return radians * 180 / Math.PI;
}

function degreesToRadians(degrees) {
  return degrees * Math.PI / 180;
}