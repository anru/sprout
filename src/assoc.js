var copy = require('./util').copy;

function assoc(obj, k, value) {
  if (obj[k] === value) return obj;
  var o = copy(obj);
  o[k] = value;
  return o;
}

module.exports = assoc;