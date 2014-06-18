var getIn = require('./getIn'),
    assocIn = require('./assocIn');

function updateIn(obj, keys, fn) {
  var args = Array.prototype.slice.call(arguments, 3),
      value = getIn(obj, keys);
  return assocIn(obj, keys, fn.apply(value, [value].concat(args)));
}

module.exports = updateIn;