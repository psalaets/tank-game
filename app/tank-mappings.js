module.exports = TankMappings;

function TankMappings() {
  this.assignments = [];
}

TankMappings.prototype = {
  unregisterTank(tank) {
    this.assignments = this.assignments.filter(a => a.tank !== tank);
  },
  findEmptyTank() {
    var emptyTankAssignment = this.assignments.find(a => a.gunnerId == null && a.driverId == null);

    if (emptyTankAssignment) {
      return emptyTankAssignment.tank;
    } else {
      return null;
    }
  },
  removePlayer(playerId) {
    var assignment = this.findAssignment(playerId);
    if (assignment) {
      if (assignment.gunnerId === playerId) {
        delete assignment.gunnerId;
      }
      if (assignment.driverId === playerId) {
        delete assignment.driverId;
      }
    }
  },
  findAssignment(playerId) {
    return this.assignments.find(a => a.gunnerId === playerId || a.driverId === playerId)
  },
  findDriverlessTank() {
    var driverlessAssignment = this.assignments.find(a => a.driverId == null);
    if (driverlessAssignment) {
      return driverlessAssignment.tank;
    } else {
      return null;
    }
  },
  findGunnerlessTank() {
    var gunnerlessAssignment = this.assignments.find(a => a.gunnerId == null);
    if (gunnerlessAssignment) {
      return gunnerlessAssignment.tank;
    } else {
      return null;
    }
  },
  assignGunner(gunnerId, tank) {
    var existingTankAssignment = this.findAssignmentByTank(tank);

    if (existingTankAssignment) {
      existingTankAssignment.gunnerId = gunnerId;
    } else {
      this.assignments.push({
        gunnerId: gunnerId,
        tank: tank
      });
    }
  },
  assignDriver(driverId, tank) {
    var existingTankAssignment = this.findAssignmentByTank(tank);

    if (existingTankAssignment) {
      existingTankAssignment.driverId = driverId;
    } else {
      this.assignments.push({
        driverId: driverId,
        tank: tank
      });
    }
  },
  findAssignmentByTank(tank) {
    return this.assignments.find(a => a.tank === tank) || null;
  },
  findTankOf(playerId) {
    var assignment = this.findAssignment(playerId);
    if (assignment) {
      return assignment.tank;
    } else {
      return null;
    }
  }
};