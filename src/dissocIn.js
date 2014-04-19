var dissoc = require('./dissoc'),
    copy = require('./util').copy;

function dissocIn(obj, keys) {
  var k = keys[0],
      ks = keys.slice(1),
      o;
  if (ks.length) {
    o = copy(obj);
    o[k] = dissocIn(obj[k], ks);
  } else {
    o = dissoc(obj, k);
  }
  return o;
}

module.exports = dissocIn;