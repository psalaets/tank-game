module.exports = {
  join,
  leave,
  turretThrottle,
  startFiring,
  stopFiring,
  leftThrottle,
  rightThrottle
};

var roles = ['watcher', 'driver', 'gunner'];

function join(role) {
  if (roles.indexOf(role) == -1) {
    throw new Error('unknown role: ' + role);
  }

  return {
    type: 'join',
    data: {
      role
    }
  };
}

function leave() {
  return {
    type: 'leave',
    data: {}
  }
}

function turretThrottle(power) {
  return {
    type: 'turret-throttle',
    data: {
      power
    }
  };
}

function startFiring() {
  return {
    type: 'start-firing',
    data: {}
  };
}

function stopFiring() {
  return {
    type: 'stop-firing',
    data: {}
  };
}

function leftThrottle(power) {
  return {
    type: 'left-throttle',
    data: {
      power
    }
  };
}

function rightThrottle(power) {
  return {
    type: 'right-throttle',
    data: {
      power
    }
  };
}