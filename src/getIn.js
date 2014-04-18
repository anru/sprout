var isUndefined = require('./util').isUndefined;

// Get value from a nested structure or null.
function getIn(obj, keys, orValue) {
  var k = keys[0],
      ks = keys.slice(1);
  if (!obj.hasOwnProperty(k)) return isUndefined(orValue) ? void 0 : orValue;
  return ks.length ? getIn(obj[k], ks) : obj[k];
}

module.exports = getIn;