var copy = require('./util').copy,
    objectKeys = require('./util').objectKeys;

function dissocIn(obj, keys) {
  var k = keys[0],
      ks = keys.slice(1),
      o = copy(obj);
  if (ks.length) {
    o[k] = dissocIn(obj[k], ks);
    if (!objectKeys(o[k]).length) delete o[k];
  } else {
    delete o[k];
  }
  return o;
}

module.exports = dissocIn;