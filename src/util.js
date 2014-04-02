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

// Merge two objects into a new object without modifying either
function merge(obj1, obj2) {
  var k,
      newObj = {};
  for (k in obj1) {
    newObj[k] = obj1[k];
  }
  for (k in obj2) {
    newObj[k] = obj2[k];
  }
  return newObj;
}

// Is a value undefined
function isUndefined(v) {
  return v === void 0;
}

module.exports = {
  copy: copy,
  merge: merge,
  isUndefined: isUndefined
};