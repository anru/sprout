import {assert} from 'chai'
import update from '../src/update'
import updateIn from '../src/updateIn'
import multiUpdate from '../src/multiUpdate'

function add(x, y) { return x + y }
function square(x) { return x * x }

describe('multiUpdate', () => {
  let obj
  beforeEach(() => {
    obj = {
      foo: 1,
      bar: 'baz',
      baz: {blah: 2}
    }
  })

  it('a property', () => {
    var o1 = multiUpdate(obj, 'foo', square)
    var o2 = update(obj, 'foo', square)
    assert.deepEqual(o1, o2)
  })

  it('a nested property', () => {
    var o1 = multiUpdate(obj, ['baz', 'blah'], square)
    var o2 = updateIn(obj, ['baz', 'blah'], square)
    assert.deepEqual(o1, o2)
  })

  it('an array property', () => {
    var arr = [1, 2, 3]
    var o1 = multiUpdate(arr, 2, square)
    var o2 = update(arr, 2, square)
    assert.deepEqual(o1, o2)
  })

  it('a property with additional arguments', () => {
    var o1 = multiUpdate(obj, 'foo', add, 1)
    var o2 = update(obj, 'foo', add, 1)
    assert.deepEqual(o1, o2)
  })
})
