var util = require('./util'),
    assoc = require('./assoc'),
    assocIn = require('./assocIn');

function multiAssoc(obj) {
  var n = arguments.length,
      i = -1,
      o = obj,
      path, value;

  while ((i += 2) < n) {
    path = arguments[i];
    value = arguments[i + 1];
    o = util.isArray(path) ? assocIn(o, path, value) : assoc(o, path, value);
  }

  return o;
}

module.exports = multiAssoc;