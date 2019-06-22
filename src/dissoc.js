import { copy } from './util'

function dissoc(obj, k) {
  if (!(k in obj)) return obj
  const o = copy(obj)
  delete o[k]
  return o
}

export default dissoc
