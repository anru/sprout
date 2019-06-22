import { copy } from './util'
import hasIn from './hasIn'

function dissocIn(obj, keys) {
  if (!hasIn(obj, keys)) return obj

  const k = keys[0]
  const ks = keys.slice(1)
  const o = copy(obj)
  if (ks.length !== 0) {
    o[k] = dissocIn(obj[k], ks)
    if (Object.keys(o[k]).length === 0) {
      delete o[k]
    }
  } else {
    delete o[k]
  }
  return o
}

export default dissocIn
