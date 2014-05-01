var dissoc = require('./dissoc'),
    objectKeys = require('./util').objectKeys,
    isObject = require('./util').isObject,
    copy = require('./util').copy;

function dissocObj(obj, obj2) {
  var keys = objectKeys(obj2),
      n = keys.length,
      i = -1,
      o, o2, k;
  if (!n) return obj;
  o = copy(obj);
  while(++i < n) {
    k = keys[i];
    o2 = obj2[k];
    if (isObject(o2)) {
      o[k] = dissocObj(obj[k], o2);
      if (!objectKeys(o[k]).length) delete o[k];
    } else {
      delete o[k];
    }
  }
  return o;
}

module.exports = dissocObj;