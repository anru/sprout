var util = require('./util'),
    dissoc = require('./dissoc'),
    dissocIn = require('./dissocIn');

function multiDissoc(obj) {
  var n = arguments.length,
      i = 0,
      o = obj,
      path;

  while (++i < n) {
    path = arguments[i];
    o = util.isArray(path) ? dissocIn(o, path) : dissoc(o, path);
  }

  return o;
}

module.exports = multiDissoc;