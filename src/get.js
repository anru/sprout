var isNull = require('./util').isNull,
    isObject = require('./util').isObject;

function get(obj, k, orValue) {
  if (!isObject(obj) || isNull(obj) || !(k in obj)) return orValue;
  return obj[k];
}

module.exports = get;