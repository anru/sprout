var vows = require('vows'),
    assert = require('assert'),
    assocObj = require('../src/assocObj');

vows.describe('assocObj()').addBatch({
  'Associating': {
    topic: function() {
      return {
        a: 1,
        b: {
          c: 2
        }
      };
    },
    'an existing property': function(obj) {
      var newObj = assocObj(obj, {a: 2});
      assert.notStrictEqual(newObj, obj);
      assert.deepEqual(newObj, {a: 2, b: {c: 2}});
      assert.deepEqual(obj, {a: 1, b: {c: 2}});
      assert.strictEqual(newObj.b, obj.b);
    },
    'multiple properties': function(obj) {
      var newObj = assocObj(obj, {a: 2, d: 3});
      assert.notStrictEqual(newObj, obj);
      assert.deepEqual(newObj, {a: 2, b: {c: 2}, d: 3});
      assert.deepEqual(obj, {a: 1, b: {c: 2}});
      assert.strictEqual(newObj.b, obj.b);
    },
    'multiple nested properties': function(obj) {
      var newObj = assocObj(obj, {a: 2, b: {c: 3}});
      assert.notStrictEqual(newObj, obj);
      assert.deepEqual(newObj, {a: 2, b: {c: 3}});
      assert.deepEqual(obj, {a: 1, b: {c: 2}});
      assert.notStrictEqual(newObj.b, obj.b);
    },
    'non-existing nested properties': function(obj) {
      var newObj = assocObj(obj, {d: {e: {f: 1}}});
      assert.notStrictEqual(newObj, obj);
      assert.deepEqual(newObj, {a: 1, b: {c: 2}, d: {e: {f: 1}}});
      assert.deepEqual(obj, {a: 1, b: {c: 2}});
      assert.strictEqual(newObj.b, obj.b);
    },
  }
}).export(module);