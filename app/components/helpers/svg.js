module.exports = {
  transform
};

/**
 * Generate the value of an svg transform attribute for translating, rotating,
 * and scaling.
 *
 * @param {Object} parts - Object containing any of these groups of
 *        properties: (x, y), (rotation, rx, ry), (scaleX, scaleY).
 */
function transform(parts) {
  var value = '';

  if ('x' in parts && 'y' in parts) {
    value += `translate(${parts.x} ${parts.y}) `;
  }

  if ('rotation' in parts && 'rx' in parts && 'ry' in parts) {
    value += `rotate(${parts.rotation} ${parts.rx} ${parts.ry}) `;
  }

  if ('scaleX' in parts && 'scaleY' in parts) {
    value += `scale(${parts.scaleX} ${parts.scaleY})`
  }

  return value.trim();
}