var get = require('./get');

// Get value from a nested structure or null.
function getIn(obj, keys, orValue) {
  var k = keys[0],
      ks = keys.slice(1),
      _obj = obj || {};
  return ks.length ? getIn(_obj[k], ks, orValue) : get(_obj, k, orValue);
}

module.exports = getIn;
