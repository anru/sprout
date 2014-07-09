var assert = require('assert');
var Benchmark = require('benchmark');
var mori = require('mori');
var React = require('react/addons');
var sprout = require('../index');

var suite = new Benchmark.Suite;

var data = {a: {b: {c: 'foo'}}, d: {e: {f: 'bar'}}};
var data_mori = mori.js_to_clj(data);

var path = ['a', 'b', 'c'];
var value = 'baz';
var update = {a: {b: {c: {'$set': value}}}};

// Test that we're benchmarking the right thing
var expected = {a: {b: {c: 'baz'}}, d: {e: {f: 'bar'}}};
assert.deepEqual(sprout.assoc(data, path, value), expected);
assert.deepEqual(mori.clj_to_js(mori.assoc_in(mori.js_to_clj(data), path, value)), expected);
assert.deepEqual(mori.clj_to_js(mori.assoc_in(data_mori, path, value)), expected);
assert.deepEqual(React.addons.update(data, update), expected);

suite
  .add('sprout.assoc', function() {
    return sprout.assoc(data, path, value);
  })
  .add('mori native', function() {
    return mori.assoc_in(data_mori, path, value);
  })
  .add('mori total conversion', function() {
    return mori.clj_to_js(mori.assoc_in(mori.js_to_clj(data), path, value));
  })
  .add('mori to js', function() {
    return mori.clj_to_js(mori.assoc_in(data_mori, path, value));
  })
  .add('React.addons.update', function() {
    return React.addons.update(data, update);
  })
  .on('cycle', function(event) {
    console.log(String(event.target));
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').pluck('name'));
  })
  .run({ 'async': true });