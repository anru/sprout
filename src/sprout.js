var multiGet = require('./multiGet'),
    multiAssoc = require('./multiAssoc'),
    multiDissoc = require('./multiDissoc'),
    multiUpdate = require('./multiUpdate'),
    merge = require('./merge'),
    deepMerge = require('./deepMerge');

module.exports = {
  get: multiGet,
  assoc: multiAssoc,
  dissoc: multiDissoc,
  update: multiUpdate,
  merge: merge,
  deepMerge: deepMerge
};