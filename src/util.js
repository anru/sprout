// Shallow copy
function copy(obj) {
  if (Array.isArray(obj)) return obj.slice();
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

function isArrayOrObject(obj) {
  return typeof obj === 'object';
}

// Is a value undefined
function isUndefined(v) {
  return v === void 0;
}

module.exports = {
  copy: copy,
  objectKeys: objectKeys,
  isArrayOrObject: isArrayOrObject,
  isUndefined: isUndefined
};