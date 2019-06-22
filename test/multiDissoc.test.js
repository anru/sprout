import {assert} from 'chai'
import dissoc from '../src/dissoc'
import dissocIn from '../src/dissocIn'
import multiDissoc from '../src/multiDissoc'

describe('multiDissoc', () => {
  let obj
  beforeEach(() => {
    obj = {
      foo: 1,
      bar: 'baz',
      baz: {blah: 2, blubb: 3}
    }
  })

  it('a property', () => {
    var o1 = multiDissoc(obj, 'foo')
    var o2 = dissoc(obj, 'foo')
    assert.deepEqual(o1, o2)
  })

  it('a nested property', () => {
    var o1 = multiDissoc(obj, ['baz', 'blah'])
    var o2 = dissocIn(obj, ['baz', 'blah'])
    assert.deepEqual(o1, o2)
  })

  it('an array property', () => {
    var arr = [1, 2, 3]
    var o1 = multiDissoc(arr, 2)
    var o2 = dissoc(arr, 2)
    assert.deepEqual(o1, o2)
  })

  it('multiple properties', () => {
    var o1 = multiDissoc(obj, 'foo', 'bar', ['baz', 'blah'])
    assert.deepEqual(o1, {baz: {blubb: 3}})
  })

  it('multiple non-existing properties returns the original object', () => {
    var o1 = multiDissoc(obj, 'a', 'b', ['baz', 'd'])
    assert.deepEqual(o1, obj)
    assert.strictEqual(o1, obj)
  })
})
