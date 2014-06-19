var util = require('./util');

function dissoc(obj, k) {
  if(!(k in obj)) return obj;
  var o = util.copy(obj);
  delete o[k];
  return o;
}

module.exports = dissoc;