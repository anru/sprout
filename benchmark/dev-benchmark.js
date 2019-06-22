const Benchmark = require('benchmark')
const sproutBuild = require('../sprout.cjs')
const rollup = require('rollup')
const buble = require('rollup-plugin-buble')

// A playground to test if new implementations have an impact on performance.

const rollupOptions = {
  input: 'src/index.js',
  plugins: [
    buble(),
  ],
}

const outputOptions = {
  file: 'node_modules/sprout.dev.js',
  format: 'cjs',
}

async function devLib() {
  const bundle = await rollup.rollup(rollupOptions)
  await bundle.write(outputOptions)
  return require('sprout.dev')
}

function test(sproutDev) {
  return new Promise(resolve => {
    const suite = new Benchmark.Suite;

    const data = {a: {b: {c: 'foo'}}, d: {e: {f: 'bar'}}, x: {y: [{z: 'baz'}]}};

    const updateFn = (x, a) => x.f.length + a

    const testAssoc = lib => () => {
      lib.assoc(data, ['a', 'b', 'c'], 'blah')
    }
    const testGet = lib => () => {
      lib.get(data, ['x', 'y', 0, 'z']);
    }
    const testUpdate = lib => () => {
      lib.update(data, ['d', 'e'], updateFn, 5)
    }

    suite
      .add('build-assoc', testAssoc(sproutBuild))
      .add('dev-assoc', testAssoc(sproutDev))
      .add('build-get', testGet(sproutBuild))
      .add('dev-get', testGet(sproutDev))
      .add('build-update', testUpdate(sproutBuild))
      .add('dev-update', testUpdate(sproutDev))
      .on('cycle', function(event) {
        console.log(String(event.target))
      })
      .on('complete', function() {
        console.log('Fastest is ' + this.filter('fastest').map('name'))
        resolve()
      })
      .run({ 'async': true })
  })
}

async function main() {
  return test(await devLib())
}

main()
  .catch(e => {
    console.error(e)
    process.exitCode = 1
  })
