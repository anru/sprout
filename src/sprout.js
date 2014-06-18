var multiGet = require('./multiGet'),
    multiAssoc = require('./multiAssoc'),
    multiDissoc = require('./multiDissoc'),
    deepMerge = require('./deepMerge'),
    update = require('./update'),
    updateIn = require('./updateIn'),
    merge = require('./merge'),
    util = require('./util');

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