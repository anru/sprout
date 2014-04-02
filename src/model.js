// WIP
var copy = require('./util').copy;

function makePath(path) {
  return Array.isArray(path) ? path : [path];
}

function perform(f) { f(); }

function noop() {}

function model(obj) {
  var m = {},
      oldObj = obj,
      newObj,
      // newObj = copy(obj),
      actions = [],
      callback = noop;

  m.assoc = function(k, value) {
    actions.push(function() { newObj[k] = value; });
    return m;
  };

  // u.set = function(keys, value) {
  //   newObj = assocIn(obj, makePath(keys), value);
  //   return u;
  // };

  // u.push = function(keys, value) {
  //   var path = makePath(keys);
  //   newObj = assocIn(obj, path, getIn(obj, path).concat([value]));
  //   return u;
  // };

  // u.unshift = function(keys, value) {
  //   var path = makePath(keys);
  //   newObj = assocIn(obj, path, [value].concat(getIn(obj, path)));
  //   return u;
  // };

  m.onChange = function(f) {
    callback = f;
    return m;
  };

  m.commit = function() {
    if (actions.length === 0) return;
    newObj = copy(oldObj);
    actions.forEach(perform);
    actions = [];
    callback(newObj, oldObj);
    oldObj = newObj;
    return m;
  };

  return m;
}

module.exports = model;