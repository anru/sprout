var vows = require('vows'),
    assert = require('assert'),
    get = require('../src/get'),
    getIn = require('../src/getIn'),
    multiGet = require('../src/multiGet');

vows.describe('multiGet()').addBatch({
  'Getting': {
    topic: function() {
      return {
        foo: 1,
        bar: 'baz',
        baz: {blah: 2}
      };
    },
    'a property': function(obj) {
      var o1 = multiGet(obj, 'foo');
      var o2 = get(obj, 'foo');
      assert.deepEqual(o1, o2);
    },
    'a nested property': function(obj) {
      var o1 = multiGet(obj, ['baz', 'blah']);
      var o2 = getIn(obj, ['baz', 'blah']);
      assert.deepEqual(o1, o2);
    },
    'an array property': function() {
      var arr = [1, 2, 3];
      var o1 = multiGet(arr, 2);
      var o2 = get(arr, 2);
      assert.equal(o1, o2);
    }
  }
}).export(module);