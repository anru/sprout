import {assert} from 'chai'
import dissoc from '../src/dissoc'

describe('dissoc', () => {
  let obj
  beforeEach(() => {
    obj = {
      foo: 1,
      bar: 'baz'
    }
  })

  it('a property results in a new object where all other properties are the same as in the original object', () => {
    var newObj = dissoc(obj, 'foo')
    assert.notStrictEqual(newObj, obj)
    assert.isUndefined(newObj.foo)
    assert.equal(obj.foo, 1)
    assert.strictEqual(newObj.bar, obj.bar)
  })

  it('a non-existing property returns the same unchanged object', () => {
    var newObj = dissoc(obj, 'blah')
    assert.strictEqual(newObj, obj)
    assert.deepEqual(newObj, obj)
  })
})
