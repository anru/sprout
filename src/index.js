var get = require('./get'),
    getIn = require('./getIn'),
    assoc = require('./assoc'),
    dissoc = require('./dissoc'),
    assocIn = require('./assocIn'),
    dissocIn = require('./dissocIn'),
    assocObj = require('./assocObj'),
    dissocObj = require('./dissocObj'),
    update = require('./update'),
    updateIn = require('./updateIn'),
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

function multiUpdate(obj, path, fn) {
  if (typeof path === 'string') return update(obj, path, fn);
  return updateIn(obj, path, fn);
}

function partialRest(fn) {
  var args = Array.prototype.slice.call(arguments, 1);
  return function(a) {
    return fn.apply(this, [a].concat(args));
  };
}

function sprout() {
  var operations = [];

  function s(obj) {
    var o = obj;
    for (var i = 0, n = operations.length; i < n; ++i) {
      o = operations[i](o);
    }
    return o;
  }

  s.assoc = function(path, value) {
    operations.push(partialRest(multiAssoc, path, value));
    return s;
  };

  s.dissoc = function(path) {
    operations.push(partialRest(multiDissoc, path));
    return s;
  };

  s.update = function(path, fn) {
    operations.push(partialRest(multiUpdate, path, fn));
    return s;
  };

  return s;
}

sprout.get = multiGet;
sprout.assoc = multiAssoc;
sprout.dissoc = multiDissoc;
sprout.update = multiUpdate;
sprout.merge = merge;

module.exports = sprout;