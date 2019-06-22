import dissoc from './dissoc'
import dissocIn from './dissocIn'

function multiDissoc(obj) {
  const argsLen = arguments.length
  let i = 0
  let o = obj
  let path

  while (++i < argsLen) {
    path = arguments[i]
    o = Array.isArray(path) ? dissocIn(o, path) : dissoc(o, path)
  }

  return o
}

export default multiDissoc
