var slice = Array.prototype.slice;

function isObject(obj) {
  return typeof obj === 'object'
}

function isPlainObject(obj) {
  return obj !== null && Object.prototype.toString.call(obj) === '[object Object]'
}

// Shallow copy
function copy(obj) {
  if (Array.isArray(obj)) { return obj.slice() }
  var newObj = {};
  for (var k in obj) {
    newObj[k] = obj[k];
  }
  return newObj
}

function get(obj, k, orValue) {
  if (!isObject(obj) || obj === null || !(k in obj)) {
    return orValue
  }
  return obj[k]
}

// Get value from a nested structure or null.
function getIn(obj, keys, orValue) {
  var k = keys[0];
  var ks = keys.slice(1);
  return get(obj, k) && ks.length ? getIn(obj[k], ks, orValue) : get(obj, k, orValue)
}

function multiGet(obj, path, orValue) {
  if (Array.isArray(path)) { return getIn(obj, path, orValue) }
  return get(obj, path, orValue)
}

function assoc(obj, k, value) {
  if (obj[k] === value) { return obj }
  var o = copy(obj);
  o[k] = value;
  return o
}

function assocIn(obj, keys, value) {
  if (getIn(obj, keys) === value) {
    return obj
  }
  var k = keys[0];
  var ks = keys.slice(1);
  var o = copy(obj);

  if (ks.length) {
    o[k] = (k in o) ? assocIn(o[k], ks, value) : assocIn({}, ks, value);
  } else {
    o[k] = value;
  }

  return o
}

function multiAssoc(obj) {
  var arguments$1 = arguments;

  var argsLen = arguments.length;
  var o = obj;
  var path;
  var value;

  for (var i = 1; i < argsLen; i += 2) {
    path = arguments$1[i];
    value = arguments$1[i + 1];
    o = Array.isArray(path) ? assocIn(o, path, value) : assoc(o, path, value);
  }

  return o
}

function dissoc(obj, k) {
  if (!(k in obj)) { return obj }
  var o = copy(obj);
  delete o[k];
  return o
}

// Check if a nested property is present. Currently only used internally

function hasIn(obj, keys) {
  var k = keys[0];
  var ks = keys.slice(1);
  if (ks.length) {
    return !(k in obj) ? false : hasIn(obj[k], ks)
  }
  return (k in obj)
}

function dissocIn(obj, keys) {
  if (!hasIn(obj, keys)) { return obj }

  var k = keys[0];
  var ks = keys.slice(1);
  var o = copy(obj);
  if (ks.length !== 0) {
    o[k] = dissocIn(obj[k], ks);
    if (Object.keys(o[k]).length === 0) {
      delete o[k];
    }
  } else {
    delete o[k];
  }
  return o
}

function multiDissoc(obj) {
  var arguments$1 = arguments;

  var argsLen = arguments.length;
  var i = 0;
  var o = obj;
  var path;

  while (++i < argsLen) {
    path = arguments$1[i];
    o = Array.isArray(path) ? dissocIn(o, path) : dissoc(o, path);
  }

  return o
}

function update(obj, k, fn) {
  var value = get(obj, k);
  return assoc(obj, k, fn.apply(value, [value ].concat( slice.call(arguments, 3))))
}

function updateIn(obj, keys, fn) {
  var value = getIn(obj, keys);
  return assocIn(obj, keys, fn.apply(value, [value ].concat( slice.call(arguments, 3))))
}

function multiUpdate(obj, path) {
  if (Array.isArray(path)) { return updateIn.apply(this, arguments) }
  return update.apply(this, arguments)
}

function merge() {
  var arguments$1 = arguments;

  var argsLen = arguments.length;
  var i = 0;
  var o = arguments[0];
  var current;

  while (++i < argsLen) {
    current = arguments$1[i];
    for (var k in current) {
      o = assoc(o, k, current[k]);
    }
  }

  return o
}

function deepMerge(obj, obj2) {
  var keys = Object.keys(obj2);
  var keysLen = keys.length;
  var i = -1;
  var o = obj;
  var value;
  var k;

  while (++i < keysLen) {
    k = keys[i];
    value = obj2[k];

    var valueIsPlainObject = isPlainObject(value);

    var newValue = value;

    if (valueIsPlainObject || Array.isArray(value)) {
      // Just assigning value to o[k] when k is not in o would be faster but less safe because we'd keep a reference to value
      newValue = (k in o) && isPlainObject(o[k]) && valueIsPlainObject ? deepMerge(o[k], value) : copy(value);
    }

    o = assoc(o, k, newValue);
  }

  return o
}

function variadicDeepMerge() {
  var arguments$1 = arguments;

  var argsLen = arguments.length;
  var i = 0;
  var target = arguments[0];

  while (++i < argsLen) {
    target = deepMerge(target, arguments$1[i]);
  }

  return target
}

export { multiAssoc as assoc, variadicDeepMerge as deepMerge, multiDissoc as dissoc, multiGet as get, merge, multiUpdate as update };
