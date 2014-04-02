var vows = require('vows'),
    assert = require('assert'),
    dissocIn = require('../index.js').dissocIn;

vows.describe('dissocIn()').addBatch({
  'Dissociating': {
    topic: function() {
      return {
        foo: 1,
        b: {
          c: {
            d: 2
          },
          f: ['foo', 'bar', 'baz']
        }
      };
    },
    // TODO: Write tests
    // 'a property results in a new object where all other properties are the same as in the original object': function(obj) {
    //   var newObj = dissocIn(obj, ['foo'], 2);
    //   assert.notStrictEqual(newObj, obj);
    //   assert.equal(newObj.foo, 2);
    //   assert.equal(obj.foo, 1);
    //   assert.strictEqual(newObj.b, obj.b);
    // },
    // 'a nested property also keeps other properties from the original object': function(obj) {
    //   var newObj = dissocIn(obj, ['b', 'c', 'd'], 3);
    //   assert.notStrictEqual(newObj, obj);
    //   assert.notStrictEqual(newObj.b, obj.b);
    //   assert.notStrictEqual(newObj.b.c, obj.b.c);
    //   assert.strictEqual(newObj.a, obj.a);
    //   assert.strictEqual(newObj.b.f, obj.b.f);
    //   assert.equal(newObj.b.c.d, 3);
    //   assert.equal(obj.b.c.d, 2);
    // },
    // 'a non-existing property creates it on the new object': function(obj) {
    //   var newObj = dissocIn(obj, ['x'], 2);
    //   assert.notStrictEqual(newObj, obj);
    //   assert.equal(newObj.x, 2);
    //   assert.isUndefined(obj.x);
    //   assert.strictEqual(newObj.a, obj.a);
    //   assert.strictEqual(newObj.b, obj.b);
    // },
    // 'a non-existing nested property creates new objects as nedessary': function(obj) {
    //   var newObj = dissocIn(obj, ['x', 'y'], 2);
    //   assert.notStrictEqual(newObj, obj);
    //   assert.equal(newObj.x.y, 2);
    //   assert.isUndefined(obj.x);
    // }
  }
}).export(module);