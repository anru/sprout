import {assert} from 'chai'
import update from '../src/update'

describe('update', () => {
  let obj
  beforeEach(() => {
    obj = {
      a: 1,
      b: 2
    }
  })

  it('a property', () => {
    var newObj = update(obj, 'b', square)
    assert.deepEqual(newObj, {a: 1, b: 4})
    assert.deepEqual(obj, {a: 1, b: 2})
  })

  it('with additional arguments', () => {
    var newObj = update(obj, 'b', add, 3)
    assert.deepEqual(newObj, {a: 1, b: 5})
    assert.deepEqual(obj, {a: 1, b: 2})
  })

  it('when updating does not change a value, return the original object', () => {
    var newObj = update(obj, 'b', identity)
    assert.deepEqual(newObj, obj)
    assert.strictEqual(newObj, obj)
  })
})

function square(x) { return x * x }
function add(x, y) { return x + y }
function identity(x) { return x }
