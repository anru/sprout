var copy = require('./util').copy,
    objectKeys = require('./util').objectKeys,
    isObject = require('./util').isObject,
    isArray = require('./util').isArray,
    getIn = require('./getIn');

function assocObj(obj, obj2) {
  var keys = objectKeys(obj2),
      n = keys.length,
      i = -1,
      o, o2, k;
  if (!n) return obj;
  o = copy(obj);
  while (++i < n) {
    k = keys[i];
    o2 = obj2[k];
    if (isObject(o2)) {
      o[k] = (k in o) ? assocObj(o[k], o2) : assocObj(isArray(o2) ? [] : {}, o2); // Just assigning o2 to o[k] when k is not in o would be faster but less safe because we'd keep a reference to o2
    } else {
      o[k] = o2;
    }
  }
  return o;
}

module.exports = assocObj;