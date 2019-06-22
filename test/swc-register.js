const { transformSync } = require('@swc/core')
const addHook = require('pirates').addHook

function matcher(_filename) {
  return true
}

function compileCode(code, filename) {
  const output = transformSync(code, {
    filename,
    jsc: {
      target: 'es5'
    },
    module: {
      type: 'commonjs'
    }
  })

  return output.code
}

addHook(compileCode, {
  exts: ['.js'],
  matcher
})
