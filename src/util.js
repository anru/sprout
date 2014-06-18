var _toString = {}.toString;

var isArray = Array.isArray || function(arr) { return _toString.call(arr) === '[object Array]'; };

function isObject(obj) {
  return typeof obj === 'object';
}

function isUndefined(v) {
  return v === void 0;
}

function isNull(v) {
  return v === null;
}

// Shallow copy
function copy(obj) {
  if (isArray(obj)) return obj.slice();
  var k,
      newObj = {};
  for (k in obj) {
    newObj[k] = obj[k];
  }
  return newObj;
}

function objectKeys(obj) {
  var keys = [], k;
  for (k in obj) {
    keys.push(k);
  }
  return keys;
}

function hasIn(obj, keys) {
  var k = keys[0],
      ks = keys.slice(1);
  if (ks.length) return !(k in obj) ? false : hasIn(obj[k], ks);
  return (k in obj);
}

module.exports = {
  copy: copy,
  objectKeys: objectKeys,
  isObject: isObject,
  isArray: isArray,
  isUndefined: isUndefined,
  isNull: isNull,
  hasIn: hasIn
};