import update from './update'
import updateIn from './updateIn'

function multiUpdate(obj, path) {
  if (Array.isArray(path)) return updateIn.apply(this, arguments)
  return update.apply(this, arguments)
}

export default multiUpdate
