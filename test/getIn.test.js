import {assert} from 'chai'
import getIn from '../src/getIn'

describe('getIn', () => {
  let obj
  beforeEach(() => {
    obj = {
      foo: {
        bar: 1
      }
    }
  })

  it('an existing property returns the value', () => {
    assert.equal(getIn(obj, ['foo', 'bar']), 1)
  })

  it('a non-existing property returns undefined by default', () => {
    assert.isUndefined(getIn(obj, ['bar', 'foo']))
  })

  it('a deeply nested non-existing property returns undefined by default', () => {
    assert.isUndefined(getIn(obj, ['bar', 'baz', 'qux']))
  })

  it('a property on a null or undefined object returns undefined by default', () => {
    assert.isUndefined(getIn(null, ['bar']))
    assert.isUndefined(getIn(undefined, ['bar']))
  })

  it('a non-existing property returns the default value if provided', () => {
    assert.equal(getIn(obj, ['foo', 'not-there'], 42), 42)
    assert.equal(getIn(obj, ['not-there'], 42), 42)
  })
})
