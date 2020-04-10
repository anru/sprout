import { copy, isPlainObject } from './util'
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

    const valueIsPlainObject = isPlainObject(value)

    let newValue = value

    if (valueIsPlainObject || Array.isArray(value)) {
      // Just assigning value to o[k] when k is not in o would be faster but less safe because we'd keep a reference to value
      newValue = (k in o) && isPlainObject(o[k]) && valueIsPlainObject ? deepMerge(o[k], value) : copy(value)
    }

    o = assoc(o, k, newValue)
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
