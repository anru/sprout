import {assert} from 'chai'
import get from '../src/get'

describe('get', () => {
  let obj
  beforeEach(() => {
    obj = {
      foo: 1,
      undef: undefined,
      nil: null
    }
  })

  it('an existing property returns the value', () => {
    assert.equal(get(obj, 'foo'), 1)
  })

  it('a non-existing property returns undefined by default', () => {
    assert.isUndefined(get(obj, 'bar'))
  })

  it('a property on a null or undefined object returns undefined by default', () => {
    assert.isUndefined(get(null, 'bar'))
    assert.isUndefined(get(undefined, 'bar'))
  })

  it('a non-existing property returns the default value if provided', () => {
    assert.equal(get(obj, 'foo', 2), 1)
    assert.equal(get(obj, 'bar', 2), 2)
  })

  it('an existing property with value undefined does not return the default value', () => {
    assert.isUndefined(get(obj, 'undef', 'not-found'))
  })

  it('an existing property with value null does not return the default value', () => {
    assert.isNull(get(obj, 'nil', 'not-found'))
  })
})
