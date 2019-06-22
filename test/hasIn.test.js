import {assert} from 'chai'
import hasIn from '../src/hasIn'

describe('hasIn', () => {
  let obj
  beforeEach(() => {
    obj = {
      foo: {
        bar: 1
      }
    }
  })

  it('an existing property', () => {
    assert.isTrue(hasIn(obj, ['foo', 'bar']))
  })

  it('a non-existing property', () => {
    assert.isFalse(hasIn(obj, ['bar', 'blah']))
  })

  it('a nested non-existing property', () => {
    assert.isFalse(hasIn(obj, ['foo', 'blah']))
  })
})
