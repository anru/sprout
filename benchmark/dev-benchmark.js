const Benchmark = require('benchmark');
const sproutBuild = require('../sprout');
const sproutMin = require('../sprout.min')
const sprout = require('../index');

// A playground to test if new implementations have an impact on performance.

const suite = new Benchmark.Suite;

const data = {a: {b: {c: 'foo'}}, d: {e: {f: 'bar'}}, x: {y: [{z: 'baz'}]}};

function testWith(lib) {
  return function() {
    lib.assoc(data, ['a', 'b', 'c'], 'blah');
    lib.get(data, ['x', 'y', 0, 'z']);
  }
}

suite
  .add('build', testWith(sproutBuild))
  .add('dev', testWith(sprout))
  .add('min', testWith(sproutMin))
  .on('cycle', function(event) {
    console.log(String(event.target));
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  .run({ 'async': true });