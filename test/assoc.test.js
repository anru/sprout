import { assert } from 'chai'
import assoc from '../src/assoc'

describe('assoc', () => {
  let obj
  beforeEach(() => {
    obj = {
      foo: 1,
      bar: 'baz'
    }
  })

  it('a property results in a new object where all other properties are the same as in the original object', () => {
    var newObj = assoc(obj, 'foo', 2)
    assert.notStrictEqual(newObj, obj)
    assert.equal(newObj.foo, 2)
    assert.equal(obj.foo, 1)
    assert.strictEqual(newObj.bar, obj.bar)
  })

  it('a non-existing property creates it on the new object', () => {
    var newObj = assoc(obj, 'x', 2)
    assert.notStrictEqual(newObj, obj)
    assert.equal(newObj.x, 2)
    assert.isUndefined(obj.x)
    assert.strictEqual(newObj.foo, obj.foo)
    assert.strictEqual(newObj.bar, obj.bar)
  })

  it('an existing property with the same value returns the same unchanged object', () => {
    var newObj = assoc(obj, 'foo', 1)
    assert.strictEqual(newObj, obj)
    assert.deepEqual(newObj, obj)
  })

  it('works with arrays too', () => {
    var arr = [1, 2]
    var newArr = assoc(arr, 1, 10)
    assert.deepEqual(newArr, [1, 10])
    assert.deepEqual(arr, [1, 2])
    assert.isArray(newArr)
  })
})
