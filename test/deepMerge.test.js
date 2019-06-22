import { assert } from 'chai'
import deepMerge from '../src/deepMerge'

describe('deepMerge', () => {
  let obj

  beforeEach(() => {
    obj = {
      a: 1,
      b: {
        c: 2
      }
    }
  })

  it('an existing property', () => {
    var newObj = deepMerge(obj, {a: 2})
    assert.notStrictEqual(newObj, obj)
    assert.deepEqual(newObj, {a: 2, b: {c: 2}})
    assert.deepEqual(obj, {a: 1, b: {c: 2}})
    assert.strictEqual(newObj.b, obj.b)
  })

  it('multiple properties', () => {
    var newObj = deepMerge(obj, {a: 2, d: 3})
    assert.notStrictEqual(newObj, obj)
    assert.deepEqual(newObj, {a: 2, b: {c: 2}, d: 3})
    assert.deepEqual(obj, {a: 1, b: {c: 2}})
    assert.strictEqual(newObj.b, obj.b)
  })

  it('multiple nested properties', () => {
    var newObj = deepMerge(obj, {a: 2, b: {c: 3}})
    assert.notStrictEqual(newObj, obj)
    assert.deepEqual(newObj, {a: 2, b: {c: 3}})
    assert.deepEqual(obj, {a: 1, b: {c: 2}})
    assert.notStrictEqual(newObj.b, obj.b)
  })

  it('non-existing nested properties', () => {
    var newObj = deepMerge(obj, {d: {e: {f: 1}}})
    assert.notStrictEqual(newObj, obj)
    assert.deepEqual(newObj, {a: 1, b: {c: 2}, d: {e: {f: 1}}})
    assert.deepEqual(obj, {a: 1, b: {c: 2}})
    assert.strictEqual(newObj.b, obj.b)
  })

  it('an array', () => {
    var obj = {}
    var newObj = deepMerge({}, {arr: [1, 2, 3]})
    assert.notStrictEqual(newObj, obj)
    assert.deepEqual(newObj, {arr: [1, 2, 3]})
    assert.isArray(newObj.arr)
    assert.deepEqual(obj, {})
  })

  it('null', () => {
    var newObj = deepMerge(obj, {b: {c: null}})
    assert.notStrictEqual(newObj, obj)
    assert.deepEqual(newObj, {a: 1, b: {c: null}})
  })

  it('multiple nested properties via multiple arguments', () => {
    var newObj = deepMerge(obj, {a: 2}, {b: {c: 3}})
    assert.notStrictEqual(newObj, obj)
    assert.deepEqual(newObj, {a: 2, b: {c: 3}})
    assert.deepEqual(obj, {a: 1, b: {c: 2}})
    assert.notStrictEqual(newObj.b, obj.b)
  })

  it('when no values changed, returns the original object', () => {
    var newObj = deepMerge(obj, {b: {c: 2}})
    assert.deepEqual(newObj, obj)
    assert.strictEqual(newObj, obj)
  })

  it('into a non-object', () => {
    var newObj = deepMerge(obj, {a: {c: 2}})
    assert.deepEqual(newObj, {a: {c: 2}, b: {c: 2}})
  })
})
