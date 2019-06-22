import get from './get'

// Get value from a nested structure or null.
function getIn(obj, keys, orValue) {
  const k = keys[0]
  const ks = keys.slice(1)
  return get(obj, k) && ks.length ? getIn(obj[k], ks, orValue) : get(obj, k, orValue)
}

export default getIn
