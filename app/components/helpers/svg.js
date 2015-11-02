module.exports = {
  transform
};

/**
 * Generate the value of an svg transform attribute for translating, rotating,
 * and scaling.
 *
 * @param {Object} parts - Object containing parts of the transform.
 *        - To translate, include: x, y
 *        - To rotate,    include: rotation, rx, ry
 *        - To scale,     include: scaleX, scaleY
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