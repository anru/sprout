var vows = require('vows'),
    assert = require('assert'),
    getIn = require('../index.js').getIn;

vows.describe('getIn()').addBatch({
  'Getting': {
    topic: function() {
      return {
        foo: {
          bar: 1
        }
      };
    },
    'an existing property returns the value': function(obj) {
      assert.equal(getIn(obj, ['foo', 'bar']), 1);
    },
    'a non-existing property returns null by default': function(obj) {
      assert.isNull(getIn(obj, ['bar', 'foo']));
    },
    'a non-existing property returns the default value if provided': function(obj) {
      assert.equal(getIn(obj, ['foo', 'bar'], 2), 1);
      assert.equal(getIn(obj, ['bar', 'foo'], 2), 2);
    },
  }
}).export(module);