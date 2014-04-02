var copy = require('./util').copy;

function assocIn(obj, keys, value) {
  var k = keys[0],
      ks = keys.slice(1),
      o = copy(obj);
  o[k] = o[k] || {};
  if (ks.length) {
    o[k] = assocIn(o[k], ks, value);
  } else {
    o[k] = value;
  }
  return o;
}

module.exports = assocIn;