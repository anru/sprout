var util = require('./util'),
    assoc = require('./assoc');

function deepMerge(obj, obj2) {
  var keys = util.objectKeys(obj2),
      n = keys.length,
      i = -1,
      o = obj,
      value, k;

  while (++i < n) {
    k = keys[i];
    value = obj2[k];

    if (util.isObject(value) && !util.isNull(value)) {
      o = assoc(o, k, (k in o) ? deepMerge(o[k], value) : util.copy(value)); // Just assigning value to o[k] when k is not in o would be faster but less safe because we'd keep a reference to value
    } else {
      o = assoc(o, k, value);
    }
  }
  
  return o;
}

function variadicDeepMerge() {
  var n = arguments.length,
      i = 0,
      o = arguments[0],
      obj;

  while (++i < n) {
    obj = arguments[i];
    o = deepMerge(o, obj);
  }

  return o;
}

module.exports = variadicDeepMerge;