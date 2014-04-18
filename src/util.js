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

// Is a value undefined
function isUndefined(v) {
  return v === void 0;
}

module.exports = {
  copy: copy,
  isUndefined: isUndefined
};