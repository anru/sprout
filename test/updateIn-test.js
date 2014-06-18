var vows = require('vows'),
    assert = require('assert'),
    updateIn = require('../src/updateIn');

vows.describe('updateIn()').addBatch({
  'Updating': {
    topic: function() {
      return {
        a: 1,
        b: {
          c: 2
        }
      };
    },
    'a nested property': function(obj) {
      var newObj = updateIn(obj, ['b', 'c'], square);
      assert.deepEqual(newObj, {a: 1, b: {c: 4}});
      assert.deepEqual(obj, {a: 1, b: {c: 2}});
    },
    'with additional arguments': function(obj) {
      var newObj = updateIn(obj, ['b', 'c'], add, 3);
      assert.deepEqual(newObj, {a: 1, b: {c: 5}});
      assert.deepEqual(obj, {a: 1, b: {c: 2}});
    },
    'when updating does not change a value, return the original object': function(obj) {
      var newObj = updateIn(obj, ['b', 'c'], identity);
      assert.deepEqual(newObj, obj);
      assert.strictEqual(newObj, obj);
    },
  }
}).export(module);

function square(x) { return x * x; }
function add(x, y) { return x + y; }
function identity(x) { return x; }