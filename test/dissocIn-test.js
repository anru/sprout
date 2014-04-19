var vows = require('vows'),
    assert = require('assert'),
    dissocIn = require('../src/dissocIn');

vows.describe('dissocIn()').addBatch({
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
      var newObj = dissocIn(obj, ['b', 'c']);
      assert.deepEqual(newObj, {a: 1, b: {d: 3}, e: {f: 3}});
      assert.deepEqual(obj, {a: 1, b: {c: 2, d: 3}, e: {f: 3}});
      assert.strictEqual(newObj.e, obj.e);
    },
    'the last property of an object removes it': function(obj) {
      var newObj = dissocIn(obj, ['e', 'f']);
      assert.deepEqual(newObj, {a: 1, b: {c: 2, d: 3}});
      assert.deepEqual(obj, {a: 1, b: {c: 2, d: 3}, e: {f: 3}});
      assert.strictEqual(newObj.b, obj.b);
    },
  }
}).export(module);