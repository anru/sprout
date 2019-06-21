const assert = require('assert');
const Benchmark = require('benchmark');
const mori = require('mori');
const immutabilityHelper = require('immutability-helper');
const clone = require('clone');
const _ = require('lodash');
const sprout = require('../index');

const suite = new Benchmark.Suite;

const data = {a: {b: {c: 'foo'}}, d: {e: {f: 'bar'}}};
const data_mori = mori.toClj(data);

const path = ['a', 'b', 'c'];
const value = 'baz';
const updateAction = {a: {b: {c: {'$set': value}}}};

// Test that we're benchmarking the right thing
const expected = {a: {b: {c: 'baz'}}, d: {e: {f: 'bar'}}};
assert.deepEqual(sprout.assoc(data, path, value), expected);
assert.deepEqual(mori.toJs(mori.assocIn(mori.toClj(data), path, value)), expected);
assert.deepEqual(mori.toJs(mori.assocIn(data_mori, path, value)), expected);
assert.deepEqual(immutabilityHelper(data, updateAction), expected);

suite
  .add('sprout.assoc', function() {
    return sprout.assoc(data, path, value);
  })
  .add('mori native', function() {
    return mori.assocIn(data_mori, path, value);
  })
  .add('mori total conversion', function() {
    return mori.toJs(mori.assocIn(mori.toClj(data), path, value));
  })
  .add('mori to js', function() {
    return mori.toJs(mori.assocIn(data_mori, path, value));
  })
  .add('immutability-helper', function() {
    return immutabilityHelper(data, updateAction);
  })
  .add('clone', function() {
    const copy = clone(data);
    copy.a.b.c = value;
    return copy;
  })
  .add('Lodash clone', function() {
    const copy = _.cloneDeep(data);
    copy.a.b.c = value;
    return copy;
  })
  .on('cycle', function(event) {
    console.log(String(event.target));
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  .run({ 'async': true });