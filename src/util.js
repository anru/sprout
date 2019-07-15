
export const slice = Array.prototype.slice

export function isObject(obj) {
  return typeof obj === 'object'
}

// Shallow copy
export function copy(obj) {
  if (Array.isArray(obj)) return obj.slice()
  const newObj = {}
  for (const k in obj) {
    newObj[k] = obj[k]
  }
  return newObj
}
