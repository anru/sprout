var vows = require('vows'),
    assert = require('assert'),
    dissoc = require('../src/dissoc'),
    dissocIn = require('../src/dissocIn'),
    multiDissoc = require('../src/multiDissoc');

vows.describe('multiDissoc()').addBatch({
  'Dissociating': {
    topic: function() {
      return {
        foo: 1,
        bar: 'baz',
        baz: {blah: 2, blubb: 3}
      };
    },
    'a property': function(obj) {
      var o1 = multiDissoc(obj, 'foo');
      var o2 = dissoc(obj, 'foo');
      assert.deepEqual(o1, o2);
    },
    'a nested property': function(obj) {
      var o1 = multiDissoc(obj, ['baz', 'blah']);
      var o2 = dissocIn(obj, ['baz', 'blah']);
      assert.deepEqual(o1, o2);
    },
    'an array property': function() {
      var arr = [1, 2, 3];
      var o1 = multiDissoc(arr, 2);
      var o2 = dissoc(arr, 2);
      assert.deepEqual(o1, o2);
    },
    'multiple properties': function(obj) {
      var o1 = multiDissoc(obj, 'foo', 'bar', ['baz', 'blah']);
      assert.deepEqual(o1, {baz: {blubb: 3}});
    },
    'multiple non-existing properties returns the original object': function(obj) {
      var o1 = multiDissoc(obj, 'a', 'b', ['baz', 'd']);
      assert.deepEqual(o1, obj);
      assert.strictEqual(o1, obj);
    },
  }
}).export(module);