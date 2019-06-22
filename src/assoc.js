import { copy } from './util'

function assoc(obj, k, value) {
  if (obj[k] === value) return obj
  const o = copy(obj)
  o[k] = value
  return o
}

export default assoc
