const { expect } = require('chai')
const plugin = require('../lib')

describe('feathers-hooks-i18n', () => {
  it('basic functionality', () => {
    expect(typeof plugin).to.equal('object', 'It worked')
  })
})
