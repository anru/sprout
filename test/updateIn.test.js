import {assert} from 'chai'
import updateIn from '../src/updateIn'

describe('updateIn', () => {
  let obj
  beforeEach(() => {
    obj = {
      a: 1,
      b: {
        c: 2
      }
    }
  })

  it('a nested property', () => {
    var newObj = updateIn(obj, ['b', 'c'], square)
    assert.deepEqual(newObj, {a: 1, b: {c: 4}})
    assert.deepEqual(obj, {a: 1, b: {c: 2}})
  })

  it('with additional arguments', () => {
    var newObj = updateIn(obj, ['b', 'c'], add, 3)
    assert.deepEqual(newObj, {a: 1, b: {c: 5}})
    assert.deepEqual(obj, {a: 1, b: {c: 2}})
  })

  it('when updating does not change a value, return the original object', () => {
    var newObj = updateIn(obj, ['b', 'c'], identity)
    assert.deepEqual(newObj, obj)
    assert.strictEqual(newObj, obj)
  })
})

function square(x) { return x * x }
function add(x, y) { return x + y }
function identity(x) { return x }
