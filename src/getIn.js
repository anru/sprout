var isNull = require('./util').isNull,
    isObject = require('./util').isObject;

// Get value from a nested structure or null.
function getIn(obj, keys, orValue) {
  var k = keys[0],
      ks = keys.slice(1);
  if (!isObject(obj) || isNull(obj) || !(k in obj)) return orValue;
  return ks.length ? getIn(obj[k], ks, orValue) : obj[k];
}

module.exports = getIn;