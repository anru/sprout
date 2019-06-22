import {assert} from 'chai'
import dissocIn from '../src/dissocIn'

describe('dissocIn', () => {
  let obj
  beforeEach(() => {
    obj = {
      a: 1,
      b: {
        c: 2,
        d: 3
      },
      e: {
        f: 3
      }
    }
  })

  it('a nested property', () => {
    var newObj = dissocIn(obj, ['b', 'c'])
    assert.deepEqual(newObj, {a: 1, b: {d: 3}, e: {f: 3}})
    assert.deepEqual(obj, {a: 1, b: {c: 2, d: 3}, e: {f: 3}})
    assert.strictEqual(newObj.e, obj.e)
  })

  it('the last property of an object removes it', () => {
    var newObj = dissocIn(obj, ['e', 'f'])
    assert.deepEqual(newObj, {a: 1, b: {c: 2, d: 3}})
    assert.deepEqual(obj, {a: 1, b: {c: 2, d: 3}, e: {f: 3}})
    assert.strictEqual(newObj.b, obj.b)
  })

  it('a non-existing property returns the original object', () => {
    var newObj = dissocIn(obj, ['x', 'y'])
    assert.deepEqual(newObj, obj)
    assert.strictEqual(newObj, obj)
  })
})
