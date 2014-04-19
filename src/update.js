var get = require('./get'),
    assoc = require('./assoc');

function update(obj, k, fn) {
  var args = Array.prototype.slice.call(arguments, 3),
      value = get(obj, k);
  return assoc(obj, k, fn.apply(value, [value].concat(args)));
}

module.exports = update;