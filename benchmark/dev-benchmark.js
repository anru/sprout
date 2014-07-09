var Benchmark = require('benchmark');
var sproutBuild = require('../sprout');
var sprout = require('../index');

// A playground to test if new implementations have an impact on performance.

var suite = new Benchmark.Suite;

var data = {a: {b: {c: 'foo'}}, d: {e: {f: 'bar'}}, x: {y: [{z: 'baz'}]}};

function testWith(lib) {
  return function() {
    lib.assoc(data, ['a', 'b', 'c'], 'blah');
    lib.get(data, ['x', 'y', 0, 'z']);
  }
}

suite
  .add('build', testWith(sproutBuild))
  .add('dev', testWith(sprout))
  .on('cycle', function(event) {
    console.log(String(event.target));
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').pluck('name'));
  })
  .run({ 'async': true });