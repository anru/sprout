import assoc from './assoc'
import assocIn from './assocIn'

function multiAssoc(obj) {
  const argsLen = arguments.length
  let o = obj
  let path
  let value

  for (let i = 1; i < argsLen; i += 2) {
    path = arguments[i]
    value = arguments[i + 1]
    o = Array.isArray(path) ? assocIn(o, path, value) : assoc(o, path, value)
  }

  return o
}

export default multiAssoc
