var dissoc = require('./util').dissoc;

function dissocIn(obj, keys) {
  var k = keys[0],
      ks = keys.slice(1),
      o;
  if (ks.length) {
    o = dissocIn(obj, ks);
  } else {
    o = dissoc(obj, k);
  }
  return o;
}

module.exports = dissocIn;