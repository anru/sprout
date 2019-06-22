import {assert} from 'chai'
import assoc from '../src/assoc'
import assocIn from '../src/assocIn'
import multiAssoc from '../src/multiAssoc'

describe('multiAssoc', () => {
  let obj
  beforeEach(() => {
    obj = {
      foo: 1,
      bar: 'baz'
    }
  })

  it('a property', () => {
    var o1 = multiAssoc(obj, 'foo', 2)
    var o2 = assoc(obj, 'foo', 2)
    assert.deepEqual(o1, o2)
  })

  it('a nested property', () => {
    var o1 = multiAssoc(obj, ['foo', 'bar'], 2)
    var o2 = assocIn(obj, ['foo', 'bar'], 2)
    assert.deepEqual(o1, o2)
  })

  it('an array property', () => {
    var arr = [1, 2, 3]
    var o1 = multiAssoc(arr, 2, 5)
    var o2 = assoc(arr, 2, 5)
    assert.deepEqual(o1, o2)
  })

  it('multiple properties', () => {
    var o1 = multiAssoc(obj, 'foo', 2, ['x', 'y'], 1)
    assert.deepEqual(o1, {
      foo: 2,
      bar: 'baz',
      x: {y: 1}
    })
  })
})
