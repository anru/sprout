import { assert } from 'chai'
import assocIn from '../src/assocIn'

describe('assocIn', () => {
  let obj
  beforeEach(() => {
    obj = {
      foo: 1,
      b: {
        c: {
          d: 2
        },
        f: ['foo', 'bar', 'baz']
      }
    }
  })

  it('a property results in a new object where all other properties are the same as in the original object', () => {
    var newObj = assocIn(obj, ['foo'], 2)
    assert.notStrictEqual(newObj, obj)
    assert.equal(newObj.foo, 2)
    assert.equal(obj.foo, 1)
    assert.strictEqual(newObj.b, obj.b)
  })

  it('a nested property also keeps other properties from the original object', () => {
    var newObj = assocIn(obj, ['b', 'c', 'd'], 3)
    assert.notStrictEqual(newObj, obj)
    assert.notStrictEqual(newObj.b, obj.b)
    assert.notStrictEqual(newObj.b.c, obj.b.c)
    assert.strictEqual(newObj.a, obj.a)
    assert.strictEqual(newObj.b.f, obj.b.f)
    assert.equal(newObj.b.c.d, 3)
    assert.equal(obj.b.c.d, 2)
  })

  it('a non-existing property creates it on the new object', () => {
    var newObj = assocIn(obj, ['x'], 2)
    assert.notStrictEqual(newObj, obj)
    assert.equal(newObj.x, 2)
    assert.isUndefined(obj.x)
    assert.strictEqual(newObj.a, obj.a)
    assert.strictEqual(newObj.b, obj.b)
  })

  it('a non-existing nested property creates new objects as nedessary', () => {
    var newObj = assocIn(obj, ['x', 'y'], 2)
    assert.notStrictEqual(newObj, obj)
    assert.equal(newObj.x.y, 2)
    assert.isUndefined(obj.x)
  })

  it('a nested property with the same value returns the same unchanged object', () => {
    var newObj = assocIn(obj, ['b', 'c', 'd'], 2)
    assert.strictEqual(newObj, obj)
    assert.deepEqual(newObj, obj)
  })
})
