module.exports = TankMappings;

function TankMappings() {
  this.assignments = [];
}

/*
removePlayer(player id)
findEmptyTank - has no driver and no gunner
unregisterTank(tank id)

canExecute(player id, command)
*/

TankMappings.prototype = {
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
    var assignment = this.assignments.find(a => a.gunnerId === playerId || a.driverId === playerId);
    if (assignment) {
      return assignment.tank;
    } else {
      return null;
    }
  }
};