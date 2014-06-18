var vows = require('vows'),
    assert = require('assert'),
    update = require('../src/update');

vows.describe('update()').addBatch({
  'Updating': {
    topic: function() {
      return {
        a: 1,
        b: 2
      };
    },
    'a property': function(obj) {
      var newObj = update(obj, 'b', square);
      assert.deepEqual(newObj, {a: 1, b: 4});
      assert.deepEqual(obj, {a: 1, b: 2});
    },
    'with additional arguments': function(obj) {
      var newObj = update(obj, 'b', add, 3);
      assert.deepEqual(newObj, {a: 1, b: 5});
      assert.deepEqual(obj, {a: 1, b: 2});
    },
    'when updating does not change a value, return the original object': function(obj) {
      var newObj = update(obj, 'b', identity);
      assert.deepEqual(newObj, obj);
      assert.strictEqual(newObj, obj);
    },
  }
}).export(module);

function square(x) { return x * x; }
function add(x, y) { return x + y; }
function identity(x) { return x; }