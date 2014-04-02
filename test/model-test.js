var vows = require('vows'),
    assert = require('assert'),
    model = require('../src/model');


var obj = {
    a: 1,
    b: {
      a: 2,
      b: 999,
      foo: 'bar'
    },
    arr: ['foo', 'bar', 'baz']
  };

vows.describe('model').addBatch({
  'model': {
    topic: function() {
      return model(obj);
    },

    'assoc': function(mod) {
      mod
        .assoc('a', 2)
        .assoc('c', 1)
        .onChange(function(newObj, oldObj) {
          assert.strictEqual(oldObj, obj);
          assert.notStrictEqual(newObj, oldObj);
          assert.equal(newObj.a, 2);
          assert.equal(newObj.c, 1);
        })
        .commit();
    },
    // topic: sprout(obj),
    // 'set property': function(o) {
    //   var newObj = o.set('a', 2).value();
    //   assert.notStrictEqual(newObj, obj);
    //   assert.equal(newObj.a, 2);
    //   assert.equal(obj.a, 1);
    // },
    // 'set nested property': function(o) {
    //   var newObj = o.set(['b', 'a'], 3).value();
    //   assert.notStrictEqual(newObj, obj);
    //   assert.notStrictEqual(newObj.b, obj.b);
    //   assert.strictEqual(newObj.a, obj.a);
    //   assert.strictEqual(newObj.arr, obj.arr);
    //   assert.equal(newObj.b.a, 3);
    //   assert.equal(obj.b.a, 2);
    // },
    // 'set in an array': function(o) {
    //   var newObj = o.set(['arr', 0], 'blah').value();
    //   assert.notStrictEqual(newObj, obj);
    //   assert.notStrictEqual(newObj.arr, obj.arr);
    //   assert.strictEqual(newObj.a, obj.a);
    //   assert.strictEqual(newObj.b, obj.b);
    //   assert.deepEqual(newObj.arr, ['blah', 'bar', 'baz']);
    //   assert.deepEqual(obj.arr, ['foo', 'bar', 'baz']);
    // },
    // 'push array': function(o) {
    //   var newObj = o.push('arr', 'blah').value();
    //   assert.notStrictEqual(newObj, obj);
    //   assert.notStrictEqual(newObj.arr, obj.arr);
    //   assert.strictEqual(newObj.a, obj.a);
    //   assert.strictEqual(newObj.b, obj.b);
    //   assert.deepEqual(newObj.arr, ['foo', 'bar', 'baz', 'blah']);
    //   assert.deepEqual(obj.arr, ['foo', 'bar', 'baz']);
    // },
    // 'unshift array': function(o) {
    //   var newObj = o.unshift('arr', 'blah').value();
    //   assert.notStrictEqual(newObj, obj);
    //   assert.notStrictEqual(newObj.arr, obj.arr);
    //   assert.strictEqual(newObj.a, obj.a);
    //   assert.strictEqual(newObj.b, obj.b);
    //   assert.deepEqual(newObj.arr, ['blah', 'foo', 'bar', 'baz']);
    //   assert.deepEqual(obj.arr, ['foo', 'bar', 'baz']);
    // },
  }
}).export(module);