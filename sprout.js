(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define(factory);
	else if(typeof exports === 'object')
		exports["sprout"] = factory();
	else
		root["sprout"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/ 		
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/ 		
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 		
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 		
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/ 	
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/ 	
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/ 	
/******/ 	
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
	  version: '0.0.3',
	  // model: require('./src/model'), // Not finished
	  get: __webpack_require__(1),
	  getIn: __webpack_require__(2),
	  assoc: __webpack_require__(3),
	  dissoc: __webpack_require__(4),
	  assocIn: __webpack_require__(5),
	  dissocIn: __webpack_require__(6),
	  merge: __webpack_require__(7)
	};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var isUndefined = __webpack_require__(8).isUndefined;

	function get(obj, k, orValue) {
	  if (!(k in obj)) return isUndefined(orValue) ? void 0 : orValue;
	  return obj[k];
	}

	module.exports = get;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var isUndefined = __webpack_require__(8).isUndefined;

	// Get value from a nested structure or null.
	function getIn(obj, keys, orValue) {
	  var k = keys[0],
	      ks = keys.slice(1);
	  if (!obj.hasOwnProperty(k)) return isUndefined(orValue) ? void 0 : orValue;
	  return ks.length ? getIn(obj[k], ks) : obj[k];
	}

	module.exports = getIn;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var copy = __webpack_require__(8).copy;

	function assoc(obj, k, value) {
	  if (obj[k] === value) return obj;
	  var o = copy(obj);
	  o[k] = value;
	  return o;
	}

	module.exports = assoc;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var copy = __webpack_require__(8).copy;

	function dissoc(obj, k) {
	  if(!(k in obj)) return obj;
	  var o = copy(obj);
	  delete o[k];
	  return o;
	}

	module.exports = dissoc;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var copy = __webpack_require__(8).copy,
	    getIn = __webpack_require__(2);

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

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var dissoc = __webpack_require__(4);

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

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

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

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

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

/***/ }
/******/ ])
})
