var vows = require('vows'),
    assert = require('assert'),
    getIn = require('../src/getIn');

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
      assert.isUndefined(getIn(obj, ['bar', 'foo']));
    },
    'a property on a null or undefined object returns undefined by default': function(obj) {
      assert.isUndefined(getIn(null, ['bar']));
      assert.isUndefined(getIn(undefined, ['bar']));
    },
    'a non-existing property returns the default value if provided': function(obj) {
      assert.equal(getIn(obj, ['foo', 'not-there'], 42), 42);
      assert.equal(getIn(obj, ['not-there'], 42), 42);
    },
  }
}).export(module);