(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.sprout = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
module.exports = {
  get: require('./src/multiGet'),
  assoc: require('./src/multiAssoc'),
  dissoc: require('./src/multiDissoc'),
  update: require('./src/multiUpdate'),
  merge: require('./src/merge'),
  deepMerge: require('./src/deepMerge')
};
},{"./src/deepMerge":4,"./src/merge":10,"./src/multiAssoc":11,"./src/multiDissoc":12,"./src/multiGet":13,"./src/multiUpdate":14}],2:[function(require,module,exports){
var util = require('./util');

function assoc(obj, k, value) {
  if (obj[k] === value) return obj;
  var o = util.copy(obj);
  o[k] = value;
  return o;
}

module.exports = assoc;
},{"./util":17}],3:[function(require,module,exports){
var util = require('./util'),
    getIn = require('./getIn');

function assocIn(obj, keys, value) {
  if (getIn(obj, keys) === value) return obj;
  var k = keys[0],
      ks = keys.slice(1),
      o = util.copy(obj);
  if (ks.length) {
    o[k] = (k in o) ? assocIn(o[k], ks, value) : assocIn({}, ks, value);
  } else {
    o[k] = value;
  }
  return o;
}

module.exports = assocIn;
},{"./getIn":8,"./util":17}],4:[function(require,module,exports){
var util = require('./util'),
    assoc = require('./assoc');

function deepMerge(obj, obj2) {
  var keys = util.objectKeys(obj2),
      n = keys.length,
      i = -1,
      o = obj,
      value, k;

  while (++i < n) {
    k = keys[i];
    value = obj2[k];

    if (util.isObject(value) && !util.isNull(value)) {
      o = assoc(o, k, (k in o) ? deepMerge(o[k], value) : util.copy(value)); // Just assigning value to o[k] when k is not in o would be faster but less safe because we'd keep a reference to value
    } else {
      o = assoc(o, k, value);
    }
  }
  
  return o;
}

function variadicDeepMerge() {
  var n = arguments.length,
      i = 0,
      o = arguments[0],
      obj;

  while (++i < n) {
    obj = arguments[i];
    o = deepMerge(o, obj);
  }

  return o;
}

module.exports = variadicDeepMerge;
},{"./assoc":2,"./util":17}],5:[function(require,module,exports){
var util = require('./util');

function dissoc(obj, k) {
  if(!(k in obj)) return obj;
  var o = util.copy(obj);
  delete o[k];
  return o;
}

module.exports = dissoc;
},{"./util":17}],6:[function(require,module,exports){
var util = require('./util'),
    hasIn = require('./hasIn');

function dissocIn(obj, keys) {
  if (!hasIn(obj, keys)) return obj;
  var k = keys[0],
      ks = keys.slice(1),
      o = util.copy(obj);
  if (ks.length) {
    o[k] = dissocIn(obj[k], ks);
    if (!util.objectKeys(o[k]).length) delete o[k];
  } else {
    delete o[k];
  }
  return o;
}

module.exports = dissocIn;
},{"./hasIn":9,"./util":17}],7:[function(require,module,exports){
var util = require('./util');

function get(obj, k, orValue) {
  if (!util.isObject(obj) || util.isNull(obj) || !(k in obj)) return orValue;
  return obj[k];
}

module.exports = get;
},{"./util":17}],8:[function(require,module,exports){
var get = require('./get');

// Get value from a nested structure or null.
function getIn(obj, keys, orValue) {
  var k = keys[0],
      ks = keys.slice(1);
  return get(obj, k) && ks.length ? getIn(obj[k], ks, orValue) : get(obj, k, orValue);
}

module.exports = getIn;

},{"./get":7}],9:[function(require,module,exports){
// Check if a nested property is present. Currently only used internally

function hasIn(obj, keys) {
  var k = keys[0],
      ks = keys.slice(1);
  if (ks.length) return !(k in obj) ? false : hasIn(obj[k], ks);
  return (k in obj);
}

module.exports = hasIn;
},{}],10:[function(require,module,exports){
var assoc = require('./assoc');

function merge() {
  var n = arguments.length,
      i = 0,
      o = arguments[0],
      k, obj;

  while (++i < n) {
    obj = arguments[i];
    for (k in obj) {
      o = assoc(o, k, obj[k]);
    }
  }

  return o;
}

module.exports = merge;
},{"./assoc":2}],11:[function(require,module,exports){
var util = require('./util'),
    assoc = require('./assoc'),
    assocIn = require('./assocIn');

function multiAssoc(obj) {
  var n = arguments.length,
      i = -1,
      o = obj,
      path, value;

  while ((i += 2) < n) {
    path = arguments[i];
    value = arguments[i + 1];
    o = util.isArray(path) ? assocIn(o, path, value) : assoc(o, path, value);
  }

  return o;
}

module.exports = multiAssoc;
},{"./assoc":2,"./assocIn":3,"./util":17}],12:[function(require,module,exports){
var util = require('./util'),
    dissoc = require('./dissoc'),
    dissocIn = require('./dissocIn');

function multiDissoc(obj) {
  var n = arguments.length,
      i = 0,
      o = obj,
      path;

  while (++i < n) {
    path = arguments[i];
    o = util.isArray(path) ? dissocIn(o, path) : dissoc(o, path);
  }

  return o;
}

module.exports = multiDissoc;
},{"./dissoc":5,"./dissocIn":6,"./util":17}],13:[function(require,module,exports){
var util = require('./util'),
    get = require('./get'),
    getIn = require('./getIn');

function multiGet(obj, path, orValue) {
  if (util.isArray(path)) return getIn(obj, path, orValue);
  return get(obj, path, orValue);
}

module.exports = multiGet;
},{"./get":7,"./getIn":8,"./util":17}],14:[function(require,module,exports){
var util = require('./util'),
    update = require('./update'),
    updateIn = require('./updateIn');

function multiUpdate(obj, path) {
  if (util.isArray(path)) return updateIn.apply(this, arguments);
  return update.apply(this, arguments);
}

module.exports = multiUpdate;
},{"./update":15,"./updateIn":16,"./util":17}],15:[function(require,module,exports){
var get = require('./get'),
    assoc = require('./assoc');

function update(obj, k, fn) {
  var args = Array.prototype.slice.call(arguments, 3),
      value = get(obj, k);
  return assoc(obj, k, fn.apply(value, [value].concat(args)));
}

module.exports = update;
},{"./assoc":2,"./get":7}],16:[function(require,module,exports){
var getIn = require('./getIn'),
    assocIn = require('./assocIn');

function updateIn(obj, keys, fn) {
  var args = Array.prototype.slice.call(arguments, 3),
      value = getIn(obj, keys);
  return assocIn(obj, keys, fn.apply(value, [value].concat(args)));
}

module.exports = updateIn;
},{"./assocIn":3,"./getIn":8}],17:[function(require,module,exports){
var isArray = Array.isArray;

function isObject(obj) {
  return typeof obj === 'object';
}

function isUndefined(v) {
  return v === void 0;
}

function isNull(v) {
  return v === null;
}

// Shallow copy
function copy(obj) {
  if (isArray(obj)) return obj.slice();
  var newObj = {};
  for (var k in obj) {
    newObj[k] = obj[k];
  }
  return newObj;
}

function objectKeys(obj) {
  var keys = [];
  for (var k in obj) {
    keys.push(k);
  }
  return keys;
}

module.exports = {
  copy: copy,
  objectKeys: objectKeys,
  isObject: isObject,
  isArray: isArray,
  isUndefined: isUndefined,
  isNull: isNull
};
},{}]},{},[1])(1)
});
