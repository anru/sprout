import {assert} from 'chai'
import get from '../src/get'
import getIn from '../src/getIn'
import multiGet from '../src/multiGet'

describe('multiGet', () => {
  let obj
  beforeEach(() => {
    obj = {
      foo: 1,
      bar: 'baz',
      baz: {blah: 2}
    }
  })

  it('a property', () => {
    var o1 = multiGet(obj, 'foo')
    var o2 = get(obj, 'foo')
    assert.deepEqual(o1, o2)
  })

  it('a nested property', () => {
    var o1 = multiGet(obj, ['baz', 'blah'])
    var o2 = getIn(obj, ['baz', 'blah'])
    assert.deepEqual(o1, o2)
  })

  it('an array property', () => {
    var arr = [1, 2, 3]
    var o1 = multiGet(arr, 2)
    var o2 = get(arr, 2)
    assert.equal(o1, o2)
  })
})
