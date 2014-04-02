// DANGER: Mutates original object! May be used internally for efficiency. Use assocIn().

function setIn(o, keys, value) {
  var k = keys[0],
      ks = keys.slice(1);
  o[k] = o[k] || {};
  if (ks.length) {
    o[k] = setIn(o[k], ks, value);
  } else {
    o[k] = value;
  }
  return o;
}

module.exports = setIn;