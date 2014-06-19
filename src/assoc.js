var util = require('./util');

function assoc(obj, k, value) {
  if (obj[k] === value) return obj;
  var o = util.copy(obj);
  o[k] = value;
  return o;
}

module.exports = assoc;