var copy = require('./util').copy,
    objectKeys = require('./util').objectKeys,
    isArrayOrObject = require('./util').isArrayOrObject,
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
    if (isArrayOrObject(o2)) {
      o[k] = (k in o) ? assocObj(o[k], o2) : assocObj({}, o2);
    } else {
      o[k] = o2;
    }
  }
  return o;
}

module.exports = assocObj;