import get from './get'
import getIn from './getIn'

function multiGet(obj, path, orValue) {
  if (Array.isArray(path)) return getIn(obj, path, orValue)
  return get(obj, path, orValue)
}

export default multiGet
