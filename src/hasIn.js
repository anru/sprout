// Check if a nested property is present. Currently only used internally

function hasIn(obj, keys) {
  const k = keys[0]
  const ks = keys.slice(1)
  if (ks.length) {
    return !(k in obj) ? false : hasIn(obj[k], ks)
  }
  return (k in obj)
}

export default hasIn
