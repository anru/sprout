var get = require('./get');

// Get value from a nested structure or null.
function getIn(obj, keys, orValue) {
  var k = keys[0],
      ks = keys.slice(1);
  return get(obj, k) && ks.length ? getIn(obj[k], ks, orValue) : get(obj, k, orValue);
}

module.exports = getIn;
