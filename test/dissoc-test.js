var vows = require('vows'),
    assert = require('assert'),
    dissoc = require('../index.js').dissoc;

vows.describe('dissoc()').addBatch({
  'Dissociating': {
    topic: function() {
      return {
        foo: 1,
        bar: 'baz'
      };
    },
    'a property results in a new object where all other properties are the same as in the original object': function(obj) {
      var newObj = dissoc(obj, 'foo');
      assert.notStrictEqual(newObj, obj);
      assert.isUndefined(newObj.foo);
      assert.equal(obj.foo, 1);
      assert.strictEqual(newObj.bar, obj.bar);
    },
    'a non-existing property returns the same unchanged object': function(obj) {
      var newObj = dissoc(obj, 'blah');
      assert.strictEqual(newObj, obj);
      assert.deepEqual(newObj, obj);
    },
  }
}).export(module);