module.exports = function monkeyPatch(p2) {
  var Utils = p2.Utils;

  // remove this when fix for https://github.com/schteppe/p2.js/issues/193
  // is released
  p2.World.prototype.removeBody = function monkeyPatchedRemovedBody(body) {
    if (this.stepping) {
      this.bodiesToBeRemoved.push(body);
    } else {
      body.world = null;
      var idx = this.bodies.indexOf(body);
      if (idx !== -1) {
        Utils.splice(this.bodies,idx,1);
        this.removeBodyEvent.body = body;
        body.resetConstraintVelocity();
        this.emit(this.removeBodyEvent);
        this.removeBodyEvent.body = null;

        // Remove disabled body collision pairs that involve body
        var pairs = this.disabledBodyCollisionPairs;
        var i = 0;
        while (i < pairs.length) {
          if (pairs[i] === body || pairs[i + 1] === body) {
            pairs.splice(i, 2);
          } else {
            i += 2;
          }
        }
      }
    }
  };
};