var isArray = Array.isArray;

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
  var newObj = {};
  for (var k in obj) {
    newObj[k] = obj[k];
  }
  return newObj;
}

function objectKeys(obj) {
  var keys = [];
  for (var k in obj) {
    keys.push(k);
  }
  return keys;
}

module.exports = {
  copy: copy,
  objectKeys: objectKeys,
  isObject: isObject,
  isArray: isArray,
  isUndefined: isUndefined,
  isNull: isNull
};