function merge() {
  var n = arguments.length,
      i = -1,
      o = {},
      k, obj;

  while (++i < n) {
    obj = arguments[i];
    for (k in obj) {
      o[k] = obj[k];
    }
  }

  return o;
}

module.exports = merge;