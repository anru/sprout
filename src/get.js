var isUndefined = require('./util').isUndefined,
    isNull = require('./util').isNull,
    isObject = require('./util').isObject;

function get(obj, k, orValue) {
  if (!isObject(obj) || isNull(obj) || !(k in obj)) return isUndefined(orValue) ? void 0 : orValue;
  return obj[k];
}

module.exports = get;