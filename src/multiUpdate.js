var util = require('./util'),
    update = require('./update'),
    updateIn = require('./updateIn');

function multiUpdate(obj, path) {
  if (util.isArray(path)) return updateIn.apply(this, arguments);
  return update.apply(this, arguments);
}

module.exports = multiUpdate;