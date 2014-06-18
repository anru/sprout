var vows = require('vows'),
    assert = require('assert'),
    hasIn = require('../src/hasIn');

vows.describe('hasIn()').addBatch({
  'Checking for the presence of': {
    topic: function() {
      return {
        foo: {
          bar: 1
        }
      };
    },
    'an existing property': function(obj) {
      assert.isTrue(hasIn(obj, ['foo', 'bar']));
    },
    'a non-existing property': function(obj) {
      assert.isFalse(hasIn(obj, ['bar', 'blah']));
    },
    'a nested non-existing property': function(obj) {
      assert.isFalse(hasIn(obj, ['foo', 'blah']));
    },
  }
}).export(module);