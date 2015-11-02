module.exports = {
  transform
};

/**
 * Generate the value of an svg transform attribute for translating, rotating,
 * and scaling.
 *
 * @param {Object} transforms - Object containing any of these groups of
 *        properties: (x, y), (rotation, rx, ry), (scaleX, scaleY).
 */
function transform(transforms) {
  var {x, y, rotation, rx, ry, scaleX, scaleY}

  var value = '';

  if ('x' in transforms) {
    value += `translate(${x} ${y}) `;
  }

  if ('rotation' in transforms) {
    value += `rotate(${rotation} ${rx} ${ry}) `;
  }

  if ('scaleX' in transforms) {
    value += `scale(${scaleX} ${scaleY})`
  }

  return value;
}