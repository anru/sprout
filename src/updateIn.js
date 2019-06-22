import { slice } from './util'
import getIn from './getIn'
import assocIn from './assocIn'

function updateIn(obj, keys, fn) {
  const value = getIn(obj, keys)
  return assocIn(obj, keys, fn.apply(value, [value, ...slice.call(arguments, 3)]))
}

export default updateIn
