import { slice } from './util'
import get from './get'
import assoc from './assoc'

function update(obj, k, fn) {
  const value = get(obj, k)
  return assoc(obj, k, fn.apply(value, [value, ...slice.call(arguments, 3)]))
}

export default update
