var vows = require('vows'),
    assert = require('assert'),
    dissocObj = require('../src/dissocObj');

vows.describe('dissocObj()').addBatch({
  'Dissociating': {
    topic: function() {
      return {
        a: 1,
        b: {
          c: 2,
          d: 3
        },
        e: {
          f: 3
        }
      };
    },
    'a nested property': function(obj) {
      var newObj = dissocObj(obj, {b: {c: true}});
      assert.deepEqual(newObj, {a: 1, b: {d: 3}, e: {f: 3}});
      assert.deepEqual(obj, {a: 1, b: {c: 2, d: 3}, e: {f: 3}});
      assert.strictEqual(newObj.e, obj.e);
    },
    'the last nested property of an object removes it': function(obj) {
      var newObj = dissocObj(obj, {e: {f: true}});
      assert.deepEqual(newObj, {a: 1, b: {c: 2, d: 3}});
      assert.deepEqual(obj, {a: 1, b: {c: 2, d: 3}, e: {f: 3}});
      assert.strictEqual(newObj.b, obj.b);
    },
    'multiple nested properties': function(obj) {
      var newObj = dissocObj(obj, {b: {c: true}, e: true});
      assert.deepEqual(newObj, {a: 1, b: {d: 3}});
      assert.deepEqual(obj, {a: 1, b: {c: 2, d: 3}, e: {f: 3}});
    },
  }
}).export(module);