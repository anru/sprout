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
    update = require('../src/update'),
    updateIn = require('../src/updateIn'),
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
}).addBatch({
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
    }
  }
}).addBatch({
  'Batching changes with sprout()': {
    topic: function() {
      return {
        foo: 1,
        bar: 'baz',
        baz: {blah: 2}
      };
    },
    'one property': function(obj) {
      var o1 = sprout()
        .assoc('foo', 2)(obj);
      var o2 = assoc(obj, 'foo', 2);
      assert.deepEqual(o1, o2);
    },
    'multiple properties': function(obj) {
      var o1 = sprout()
        .assoc('foo', 2)
        .update(['baz', 'blah'], square)
        .dissoc('bar')(obj);
      var o2 = dissoc(updateIn(assoc(obj, 'foo', 2), ['baz', 'blah'], square), 'bar');
      assert.deepEqual(o1, o2);
    },
    'create a getter': function(obj) {
      var getFoo = sprout().get('foo');
      assert.equal(getFoo(obj), 1);
    },
    'deriving a getter from another getter does not change the original getter': function(obj) {
      var getBaz = sprout().get('baz');
      var getBlah = getBaz.get('blah');
      assert.deepEqual(getBaz(obj), {blah: 2});
      assert.equal(getBlah(obj), 2);
    },
    'derive a assoc from a getter': function(obj) {
      var getBaz = sprout().get('baz');
      var assocBlah = getBaz.assoc('blah', 3); // Well, this isn't entirely useful
      assert.deepEqual(getBaz(obj), {blah: 2});
      assert.deepEqual(assocBlah(obj), {blah: 3}); // This really should rather return the whole changed obj

      // This would be preferred:

      // var cursor = sprout(obj);
      // var bazCursor = cursor.get('baz');
      

    },
  }
}).export(module);

function square(x) { return x * x; }