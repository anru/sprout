!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.sprout=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
var copy = _dereq_('./util').copy;

function assoc(obj, k, value) {
  if (obj[k] === value) return obj;
  var o = copy(obj);
  o[k] = value;
  return o;
}

module.exports = assoc;
},{"./util":9}],2:[function(_dereq_,module,exports){
var copy = _dereq_('./util').copy,
    getIn = _dereq_('./getIn');

function assocIn(obj, keys, value) {
  if (getIn(obj, keys) === value) return obj;
  var k = keys[0],
      ks = keys.slice(1),
      o = copy(obj);
  if (ks.length) {
    o[k] = (k in o) ? assocIn(o[k], ks, value) : assocIn({}, ks, value);
  } else {
    o[k] = value;
  }
  return o;
}

module.exports = assocIn;
},{"./getIn":6,"./util":9}],3:[function(_dereq_,module,exports){
var copy = _dereq_('./util').copy;

function dissoc(obj, k) {
  if(!(k in obj)) return obj;
  var o = copy(obj);
  delete o[k];
  return o;
}

module.exports = dissoc;
},{"./util":9}],4:[function(_dereq_,module,exports){
var dissoc = _dereq_('./dissoc');

function dissocIn(obj, keys) {
  var k = keys[0],
      ks = keys.slice(1),
      o;
  if (ks.length) {
    o = dissocIn(obj, ks);
  } else {
    o = dissoc(obj, k);
  }
  return o;
}

module.exports = dissocIn;
},{"./dissoc":3}],5:[function(_dereq_,module,exports){
var isUndefined = _dereq_('./util').isUndefined;

function get(obj, k, orValue) {
  if (!(k in obj)) return isUndefined(orValue) ? void 0 : orValue;
  return obj[k];
}

module.exports = get;
},{"./util":9}],6:[function(_dereq_,module,exports){
var isUndefined = _dereq_('./util').isUndefined;

// Get value from a nested structure or null.
function getIn(obj, keys, orValue) {
  var k = keys[0],
      ks = keys.slice(1);
  if (!obj.hasOwnProperty(k)) return isUndefined(orValue) ? void 0 : orValue;
  return ks.length ? getIn(obj[k], ks) : obj[k];
}

module.exports = getIn;
},{"./util":9}],7:[function(_dereq_,module,exports){
module.exports = {
  version: '0.0.3',
  // model: require('./src/model'), // Not finished
  get: _dereq_('./get'),
  getIn: _dereq_('./getIn'),
  assoc: _dereq_('./assoc'),
  dissoc: _dereq_('./dissoc'),
  assocIn: _dereq_('./assocIn'),
  dissocIn: _dereq_('./dissocIn'),
  merge: _dereq_('./merge')
};
},{"./assoc":1,"./assocIn":2,"./dissoc":3,"./dissocIn":4,"./get":5,"./getIn":6,"./merge":8}],8:[function(_dereq_,module,exports){
function merge() {
  var n = arguments.length,
      i = -1,
      o = {},
      k, obj;

  while (++i < n) {
    obj = arguments[i];
    for (k in obj) {
      o[k] = obj[k];
    }
  }

  return o;
}

module.exports = merge;
},{}],9:[function(_dereq_,module,exports){
// Shallow copy
function copy(obj) {
  if (Array.isArray(obj)) return obj.slice();
  var k,
      newObj = {};
  for (k in obj) {
    newObj[k] = obj[k];
  }
  return newObj;
}

// Is a value undefined
function isUndefined(v) {
  return v === void 0;
}

module.exports = {
  copy: copy,
  isUndefined: isUndefined
};
},{}]},{},[7])
(7)
});