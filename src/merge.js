var assoc = require('./assoc');

function merge() {
  var n = arguments.length,
      i = 0,
      o = arguments[0],
      k, obj;

  while (++i < n) {
    obj = arguments[i];
    for (k in obj) {
      o = assoc(o, k, obj[k]);
    }
  }

  return o;
}

module.exports = merge;