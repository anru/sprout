var get = require('./get'),
    getIn = require('./getIn'),
    assoc = require('./assoc'),
    assocIn = require('./assocIn'),
    multiDissoc = require('./multiDissoc'),
    deepMerge = require('./deepMerge'),
    update = require('./update'),
    updateIn = require('./updateIn'),
    merge = require('./merge'),
    util = require('./util');

function multiGet(obj, path, orValue) {
  if (util.isArray(path)) return getIn(obj, path, orValue);
  return get(obj, path, orValue);
}

function multiAssoc(obj, path, value) {
  if (util.isArray(path)) return assocIn(obj, path, value);
  return assoc(obj, path, value);
}

function multiUpdate(obj, path, fn) {
  if (util.isArray(path)) return updateIn(obj, path, fn);
  return update(obj, path, fn);
}

module.exports = {
  get: multiGet,
  assoc: multiAssoc,
  dissoc: multiDissoc,
  update: multiUpdate,
  merge: merge,
  deepMerge: deepMerge
};