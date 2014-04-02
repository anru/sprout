var copy = require('./util').copy;

function dissoc(obj, k) {
  var o = copy(obj);
  delete o[k];
  return o;
}

module.exports = dissoc;