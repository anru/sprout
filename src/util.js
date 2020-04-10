
export const slice = Array.prototype.slice

export function isObject(obj) {
  return typeof obj === 'object'
}

export function isPlainObject(obj) {
  return obj !== null && Object.prototype.toString.call(obj) === '[object Object]'
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
