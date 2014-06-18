var vows = require('vows'),
    assert = require('assert'),
    sprout = require('../src/sprout'),
    get = require('../src/get'),
    getIn = require('../src/getIn'),
    assoc = require('../src/assoc'),
    dissoc = require('../src/dissoc'),
    assocIn = require('../src/assocIn'),
    dissocIn = require('../src/dissocIn'),
    deepMerge = require('../src/deepMerge'),
    update = require('../src/update'),
    updateIn = require('../src/updateIn'),
    merge = require('../src/merge');

vows.describe('sprout').addBatch({
  'Updating': {
    topic: function() {
      return {
        foo: 1,
        bar: 'baz',
        baz: {blah: 2}
      };
    },
    'a property': function(obj) {
      var o1 = sprout.update(obj, 'foo', square);
      var o2 = update(obj, 'foo', square);
      assert.deepEqual(o1, o2);
    },
    'a nested property': function(obj) {
      var o1 = sprout.update(obj, ['baz', 'blah'], square);
      var o2 = updateIn(obj, ['baz', 'blah'], square);
      assert.deepEqual(o1, o2);
    },
    'an array property': function() {
      var arr = [1, 2, 3]
      var o1 = sprout.update(arr, 2, square);
      var o2 = update(arr, 2, square);
      assert.deepEqual(o1, o2);
    }
  }
}).export(module);

function square(x) { return x * x; }