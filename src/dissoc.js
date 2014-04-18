var copy = require('./util').copy;

function dissoc(obj, k) {
  if(!(k in obj)) return obj;
  var o = copy(obj);
  delete o[k];
  return o;
}

module.exports = dissoc;