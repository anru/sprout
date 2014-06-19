var vows = require('vows'),
    assert = require('assert'),
    merge = require('../src/merge');

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
    'when no values are changed, returns the original object': function(obj) {
      var newObj = merge(obj, {foo: 1, bar: 'baz'});
      assert.deepEqual(newObj, obj);
      assert.strictEqual(newObj, obj);
    },
  }
}).export(module);