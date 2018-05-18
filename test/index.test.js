const assert = require('assert')
const plugin = require('../lib')

describe('feathers-hooks-i18n', () => {
  it('basic functionality', () => {
    assert.equal(typeof plugin, 'object', 'It worked')
  })
})
