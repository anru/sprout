import { copy } from './util'
import getIn from './getIn'

function assocIn(obj, keys, value) {
  if (getIn(obj, keys) === value) {
    return obj
  }
  const k = keys[0]
  const ks = keys.slice(1)
  const o = copy(obj)

  if (ks.length) {
    o[k] = (k in o) ? assocIn(o[k], ks, value) : assocIn({}, ks, value)
  } else {
    o[k] = value
  }

  return o
}

export default assocIn
