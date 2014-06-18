var util = require('./util'),
    getIn = require('./getIn');

function dissocIn(obj, keys) {
  if (!util.hasIn(obj, keys)) return obj;
  var k = keys[0],
      ks = keys.slice(1),
      o = util.copy(obj);
  if (ks.length) {
    o[k] = dissocIn(obj[k], ks);
    if (!util.objectKeys(o[k]).length) delete o[k];
  } else {
    delete o[k];
  }
  return o;
}

module.exports = dissocIn;