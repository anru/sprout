import { isObject } from './util'

function get(obj, k, orValue) {
  if (!isObject(obj) || obj === null || !(k in obj)) {
    return orValue
  }
  return obj[k]
}

export default get
