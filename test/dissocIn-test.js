var vows = require('vows'),
    assert = require('assert'),
    dissocIn = require('../src/dissocIn');

vows.describe('dissocIn()').addBatch({
  'Dissociating': {
    topic: function() {
      return {
        a: 1,
        b: {
          c: 2
        },
        d: {
          e: 3
        }
      };
    },
    'a nested property': function(obj) {
      var newObj = dissocIn(obj, ['b', 'c']);
      assert.deepEqual(newObj, {a: 1, b: {}, d: {e: 3}});
      assert.deepEqual(obj, {a: 1, b: {c: 2}, d: {e: 3}});
      assert.strictEqual(newObj.d, obj.d);
    },
  }
}).export(module);