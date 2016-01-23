module.exports = TankMappings;

function TankMappings() {
  this.assignments = [];
}

TankMappings.prototype = {
  unregisterTank(tankId) {
    this.assignments = this.assignments.filter(a => a.tankId !== tankId);
  },
  findEmptyTanks() {
    return this.assignments
      .filter(a => a.gunnerId == null && a.driverId == null)
      .map(a => a.tankId);
  },
  removePlayer(playerId) {
    var assignment = this.findAssignment(playerId);
    if (assignment) {
      if (assignment.gunnerId === playerId) {
        assignment.gunnerId = null;
      }
      if (assignment.driverId === playerId) {
        assignment.driverId = null;
      }
    }
  },
  findAssignment(playerId) {
    return this.assignments.find(a => a.gunnerId === playerId || a.driverId === playerId)
  },
  findDriverlessTank() {
    var driverlessAssignment = this.assignments.find(a => a.driverId == null);
    if (driverlessAssignment) {
      return driverlessAssignment.tankId;
    } else {
      return null;
    }
  },
  findGunnerlessTank() {
    var gunnerlessAssignment = this.assignments.find(a => a.gunnerId == null);
    if (gunnerlessAssignment) {
      return gunnerlessAssignment.tankId;
    } else {
      return null;
    }
  },
  assignGunner(gunnerId, tankId) {
    var existingTankAssignment = this.findAssignmentByTank(tankId);

    if (existingTankAssignment) {
      existingTankAssignment.gunnerId = gunnerId;
    } else {
      this.assignments.push({
        gunnerId: gunnerId,
        tankId: tankId
      });
    }
  },
  assignDriver(driverId, tankId) {
    var existingTankAssignment = this.findAssignmentByTank(tankId);

    if (existingTankAssignment) {
      existingTankAssignment.driverId = driverId;
    } else {
      this.assignments.push({
        driverId: driverId,
        tankId: tankId
      });
    }
  },
  findAssignmentByTank(tankId) {
    return this.assignments.find(a => a.tankId === tankId) || null;
  },
  findTankOf(playerId) {
    var assignment = this.findAssignment(playerId);
    if (assignment) {
      return assignment.tankId;
    } else {
      return null;
    }
  },
  isDriver(playerId) {
    var assignment = this.findAssignment(playerId);
    return !!(assignment && assignment.driverId === playerId);
  },
  isGunner(playerId) {
    var assignment = this.findAssignment(playerId);
    return !!(assignment && assignment.gunnerId === playerId);
  }
};