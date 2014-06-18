var util = require('./util'),
    get = require('./get'),
    getIn = require('./getIn');

function multiGet(obj, path, orValue) {
  if (util.isArray(path)) return getIn(obj, path, orValue);
  return get(obj, path, orValue);
}

module.exports = multiGet;