var vows = require('vows'),
    assert = require('assert'),
    deepMerge = require('../src/deepMerge');

vows.describe('deepMerge()').addBatch({
  'Deep merging': {
    topic: function() {
      return {
        a: 1,
        b: {
          c: 2
        }
      };
    },
    'an existing property': function(obj) {
      var newObj = deepMerge(obj, {a: 2});
      assert.notStrictEqual(newObj, obj);
      assert.deepEqual(newObj, {a: 2, b: {c: 2}});
      assert.deepEqual(obj, {a: 1, b: {c: 2}});
      assert.strictEqual(newObj.b, obj.b);
    },
    'multiple properties': function(obj) {
      var newObj = deepMerge(obj, {a: 2, d: 3});
      assert.notStrictEqual(newObj, obj);
      assert.deepEqual(newObj, {a: 2, b: {c: 2}, d: 3});
      assert.deepEqual(obj, {a: 1, b: {c: 2}});
      assert.strictEqual(newObj.b, obj.b);
    },
    'multiple nested properties': function(obj) {
      var newObj = deepMerge(obj, {a: 2, b: {c: 3}});
      assert.notStrictEqual(newObj, obj);
      assert.deepEqual(newObj, {a: 2, b: {c: 3}});
      assert.deepEqual(obj, {a: 1, b: {c: 2}});
      assert.notStrictEqual(newObj.b, obj.b);
    },
    'non-existing nested properties': function(obj) {
      var newObj = deepMerge(obj, {d: {e: {f: 1}}});
      assert.notStrictEqual(newObj, obj);
      assert.deepEqual(newObj, {a: 1, b: {c: 2}, d: {e: {f: 1}}});
      assert.deepEqual(obj, {a: 1, b: {c: 2}});
      assert.strictEqual(newObj.b, obj.b);
    },
    'an array': function() {
      var obj = {};
      var newObj = deepMerge({}, {arr: [1, 2, 3]});
      assert.notStrictEqual(newObj, obj);
      assert.deepEqual(newObj, {arr: [1, 2, 3]});
      assert.isArray(newObj.arr);
      assert.deepEqual(obj, {});
    },
    'null': function(obj) {
      var newObj = deepMerge(obj, {b: {c: null}});
      assert.notStrictEqual(newObj, obj);
      assert.deepEqual(newObj, {a: 1, b: {c: null}});
    },
    'multiple nested properties via multiple arguments': function(obj) {
      var newObj = deepMerge(obj, {a: 2}, {b: {c: 3}});
      assert.notStrictEqual(newObj, obj);
      assert.deepEqual(newObj, {a: 2, b: {c: 3}});
      assert.deepEqual(obj, {a: 1, b: {c: 2}});
      assert.notStrictEqual(newObj.b, obj.b);
    },
    'when no values changed, returns the original object': function(obj) {
      var newObj = deepMerge(obj, {b: {c: 2}});
      assert.deepEqual(newObj, obj);
      assert.strictEqual(newObj, obj);
    },
    'into a non-object': function(obj) {
      var newObj = deepMerge(obj, {a: {c: 2}});
      assert.deepEqual(newObj, {a: {c: 2}, b: {c: 2}});
    },
  }
}).export(module);