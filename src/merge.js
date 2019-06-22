import assoc from './assoc'

function merge() {
  const argsLen = arguments.length
  let i = 0
  let o = arguments[0]
  let current

  while (++i < argsLen) {
    current = arguments[i]
    for (let k in current) {
      o = assoc(o, k, current[k])
    }
  }

  return o
}

export default merge
