var isUndefined = require('./util').isUndefined;

function get(obj, k, orValue) {
  if (!(k in obj)) return isUndefined(orValue) ? void 0 : orValue;
  return obj[k];
}

module.exports = get;