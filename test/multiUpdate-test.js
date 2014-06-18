var vows = require('vows'),
    assert = require('assert'),
    update = require('../src/update'),
    updateIn = require('../src/updateIn'),
    multiUpdate = require('../src/multiUpdate');

function add(x, y) { return x + y; }
function square(x) { return x * x; }

vows.describe('multiUpdate()').addBatch({
  'Updating': {
    topic: function() {
      return {
        foo: 1,
        bar: 'baz',
        baz: {blah: 2}
      };
    },
    'a property': function(obj) {
      var o1 = multiUpdate(obj, 'foo', square);
      var o2 = update(obj, 'foo', square);
      assert.deepEqual(o1, o2);
    },
    'a nested property': function(obj) {
      var o1 = multiUpdate(obj, ['baz', 'blah'], square);
      var o2 = updateIn(obj, ['baz', 'blah'], square);
      assert.deepEqual(o1, o2);
    },
    'an array property': function() {
      var arr = [1, 2, 3];
      var o1 = multiUpdate(arr, 2, square);
      var o2 = update(arr, 2, square);
      assert.deepEqual(o1, o2);
    },
    'a property with additional arguments': function(obj) {
      var o1 = multiUpdate(obj, 'foo', add, 1);
      var o2 = update(obj, 'foo', add, 1);
      assert.deepEqual(o1, o2);
    },
  }
}).export(module);