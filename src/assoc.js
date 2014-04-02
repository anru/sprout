var copy = require('./util').copy;

function assoc(obj, k, value) {
  var o = copy(obj);
  o[k] = value;
  return o;
}

module.exports = assoc;