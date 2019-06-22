import buble from 'rollup-plugin-buble'

export default {
  input: 'src/index.js',
  onwarn (warning, warn) {
    // skip certain warnings
    switch (warning.code) {
      case 'NON_EXISTENT_EXPORT':
      case 'UNRESOLVED_IMPORT':
        throw new Error(warning.message)
      default:
        warn(warning);
    }    
  },
  plugins: [
    buble(),
  ],
  output: [
    {
      file: 'sprout.js',
      name: 'sprout',
      format: 'iife',
    },
    {
      file: 'sprout.cjs.js',
      format: 'cjs',
    },
    {
      file: 'sprout.esm.js',
      format: 'esm'
    }
  ]
}