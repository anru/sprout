var util = require('./util');

function get(obj, k, orValue) {
  if (!util.isObject(obj) || util.isNull(obj) || !(k in obj)) return orValue;
  return obj[k];
}

module.exports = get;