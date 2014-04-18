var vows = require('vows'),
    assert = require('assert'),
    assoc = require('../index.js').assoc;

vows.describe('assoc()').addBatch({
  'Associating': {
    topic: function() {
      return {
        foo: 1,
        bar: 'baz'
      };
    },
    'a property results in a new object where all other properties are the same as in the original object': function(obj) {
      var newObj = assoc(obj, 'foo', 2);
      assert.notStrictEqual(newObj, obj);
      assert.equal(newObj.foo, 2);
      assert.equal(obj.foo, 1);
      assert.strictEqual(newObj.bar, obj.bar);
    },
    'a non-existing property creates it on the new object': function(obj) {
      var newObj = assoc(obj, 'x', 2);
      assert.notStrictEqual(newObj, obj);
      assert.equal(newObj.x, 2);
      assert.isUndefined(obj.x);
      assert.strictEqual(newObj.foo, obj.foo);
      assert.strictEqual(newObj.bar, obj.bar);
    },
    'an existing property with the same value returns the same unchanged object': function(obj) {
      var newObj = assoc(obj, 'foo', 1);
      assert.strictEqual(newObj, obj);
      assert.deepEqual(newObj, obj);
    }
  }
}).export(module);