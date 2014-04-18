var vows = require('vows'),
    assert = require('assert'),
    merge = require('../src/index').merge;

vows.describe('merge()').addBatch({
  'Merging': {
    topic: function() {
      return {
        foo: 1,
        bar: 'baz'
      };
    },
    'two objects results in a new object with combined properties': function(obj) {
      var newObj = merge(obj, {baz: 2});
      assert.notStrictEqual(newObj, obj);
      assert.deepEqual(newObj, {foo: 1, bar: 'baz', baz: 2});
    },
    'properties defined in later objects take precedence': function(obj) {
      var newObj = merge(obj, {foo: 2});
      assert.notStrictEqual(newObj, obj);
      assert.deepEqual(newObj, {foo: 2, bar: 'baz'});
    },
    'an arbitrary number of objects results in a new object with combined properties': function(obj) {
      var newObj = merge(obj, {baz: 2}, {foo: 2});
      assert.notStrictEqual(newObj, obj);
      assert.deepEqual(newObj, {foo: 2, bar: 'baz', baz: 2});
    },
    'with one argument returns a shallow copy': function(obj) {
      var newObj = merge(obj);
      assert.notStrictEqual(newObj, obj);
      assert.deepEqual(newObj, obj);
    },
    'without any arguments returns an empty object': function(obj) {
      var newObj = merge();
      assert.deepEqual(newObj, {});
    },
  }
}).export(module);