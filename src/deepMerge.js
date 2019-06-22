import { copy, isObject } from './util'
import assoc from './assoc'

function deepMerge(obj, obj2) {
  const keys = Object.keys(obj2)
  const keysLen = keys.length
  let i = -1
  let o = obj
  let value
  let k

  while (++i < keysLen) {
    k = keys[i]
    value = obj2[k]

    if (isObject(value) && value !== null) {
      // Just assigning value to o[k] when k is not in o would be faster but less safe because we'd keep a reference to value
      o = assoc(o, k, (k in o) ? deepMerge(o[k], value) : copy(value))
    } else {
      o = assoc(o, k, value)
    }
  }

  return o
}

function variadicDeepMerge() {
  const argsLen = arguments.length
  let i = 0
  let target = arguments[0]

  while (++i < argsLen) {
    target = deepMerge(target, arguments[i])
  }

  return target
}

export default variadicDeepMerge
