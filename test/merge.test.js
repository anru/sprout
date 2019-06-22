import {assert} from 'chai'
import merge from '../src/merge'

describe('merge', () => {
  let obj
  beforeEach(() => {
    obj = {
      foo: 1,
      bar: 'baz'
    }
  })

  it('two objects results in a new object with combined properties', () => {
    var newObj = merge(obj, {baz: 2})
    assert.notStrictEqual(newObj, obj)
    assert.deepEqual(newObj, {foo: 1, bar: 'baz', baz: 2})
  })

  it('properties defined in later objects take precedence', () => {
    var newObj = merge(obj, {foo: 2})
    assert.notStrictEqual(newObj, obj)
    assert.deepEqual(newObj, {foo: 2, bar: 'baz'})
  })

  it('an arbitrary number of objects results in a new object with combined properties', () => {
    var newObj = merge(obj, {baz: 2}, {foo: 2})
    assert.notStrictEqual(newObj, obj)
    assert.deepEqual(newObj, {foo: 2, bar: 'baz', baz: 2})
  })

  it('when no values are changed, returns the original object', () => {
    var newObj = merge(obj, {foo: 1, bar: 'baz'})
    assert.deepEqual(newObj, obj)
    assert.strictEqual(newObj, obj)
  })
})
