var vows = require('vows'),
    assert = require('assert'),
    assoc = require('../src/assoc'),
    assocIn = require('../src/assocIn'),
    multiAssoc = require('../src/multiAssoc');

vows.describe('multiAssoc()').addBatch({
  'Associating': {
    topic: function() {
      return {
        foo: 1,
        bar: 'baz'
      };
    },
    'a property': function(obj) {
      var o1 = multiAssoc(obj, 'foo', 2);
      var o2 = assoc(obj, 'foo', 2);
      assert.deepEqual(o1, o2);
    },
    'a nested property': function(obj) {
      var o1 = multiAssoc(obj, ['foo', 'bar'], 2);
      var o2 = assocIn(obj, ['foo', 'bar'], 2);
      assert.deepEqual(o1, o2);
    },
    'an array property': function() {
      var arr = [1, 2, 3];
      var o1 = multiAssoc(arr, 2, 5);
      var o2 = assoc(arr, 2, 5);
      assert.deepEqual(o1, o2);
    },
    'multiple properties': function(obj) {
      var o1 = multiAssoc(obj, 'foo', 2, ['x', 'y'], 1);
      assert.deepEqual(o1, {
        foo: 2,
        bar: 'baz',
        x: {y: 1}
      });
    },
  }
}).export(module);