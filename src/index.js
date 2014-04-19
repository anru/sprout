var get = require('./get'),
    getIn = require('./getIn'),
    assoc = require('./assoc'),
    dissoc = require('./dissoc'),
    assocIn = require('./assocIn'),
    dissocIn = require('./dissocIn'),
    assocObj = require('./assocObj'),
    dissocObj = require('./dissocObj'),
    merge = require('./merge'),
    util = require('./util');

function multiGet(obj, path, orValue) {
  if (typeof path === 'string') return get(obj, path, orValue);
  return getIn(obj, path, orValue);
}

function multiAssoc(obj, path, value) {
  if (typeof path === 'string') return assoc(obj, path, value);
  if (!util.isUndefined(value) && util.isArray(path)) return assocIn(obj, path, value);
  return assocObj(obj, path);
}

function multiDissoc(obj, path) {
  if (typeof path === 'string') return dissoc(obj, path);
  if (util.isArray(path)) return dissocIn(obj, path);
  return dissocObj(obj, path);
}

module.exports = {
  get: multiGet,
  assoc: multiAssoc,
  dissoc: multiDissoc
};