var vows = require('vows'),
    assert = require('assert'),
    sprout = require('../src/index'),
    get = require('../src/get'),
    getIn = require('../src/getIn'),
    assoc = require('../src/assoc'),
    dissoc = require('../src/dissoc'),
    assocIn = require('../src/assocIn'),
    dissocIn = require('../src/dissocIn'),
    assocObj = require('../src/assocObj'),
    dissocObj = require('../src/dissocObj'),
    merge = require('../src/merge');

vows.describe('sprout').addBatch({
  'Getting': {
    topic: function() {
      return {
        foo: 1,
        bar: 'baz',
        baz: {blah: 2}
      };
    },
    'a property': function(obj) {
      var o1 = sprout.get(obj, 'foo');
      var o2 = get(obj, 'foo');
      assert.deepEqual(o1, o2);
    },
    'a nested property': function(obj) {
      var o1 = sprout.get(obj, ['baz', 'blah']);
      var o2 = getIn(obj, ['baz', 'blah']);
      assert.deepEqual(o1, o2);
    }
  }
}).addBatch({
  'Associating': {
    topic: function() {
      return {
        foo: 1,
        bar: 'baz'
      };
    },
    'a property': function(obj) {
      var o1 = sprout.assoc(obj, 'foo', 2);
      var o2 = assoc(obj, 'foo', 2);
      assert.deepEqual(o1, o2);
    },
    'a nested property': function(obj) {
      var o1 = sprout.assoc(obj, ['foo', 'bar'], 2);
      var o2 = assocIn(obj, ['foo', 'bar'], 2);
      assert.deepEqual(o1, o2);
    },
    'multiple properties': function(obj) {
      var o1 = sprout.assoc(obj, {foo: 2, bar: 'blah'});
      var o2 = assocObj(obj, {foo: 2, bar: 'blah'});
      assert.deepEqual(o1, o2);
    }
  }
}).addBatch({
  'Dissociating': {
    topic: function() {
      return {
        foo: 1,
        bar: 'baz',
        baz: {blah: 2}
      };
    },
    'a property': function(obj) {
      var o1 = sprout.dissoc(obj, 'foo');
      var o2 = dissoc(obj, 'foo');
      assert.deepEqual(o1, o2);
    },
    'a nested property': function(obj) {
      var o1 = sprout.dissoc(obj, ['baz', 'blah']);
      var o2 = dissocIn(obj, ['baz', 'blah']);
      assert.deepEqual(o1, o2);
    },
    'multiple properties': function(obj) {
      var o1 = sprout.dissoc(obj, {foo: true, baz: {blah: true}});
      var o2 = dissocObj(obj, {foo: true, baz: {blah: true}});
      assert.deepEqual(o1, o2);
    }
  }
}).export(module);