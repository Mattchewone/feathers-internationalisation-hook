const assert = require('assert')
const makeHook = require('../lib/parse-data')

const parseData = makeHook({ fields: ['title', 'description'] })

describe('Data', function () {
  it('transforms the data (object)', function (done) {
    const context = {
      type: 'before',
      method: 'create',
      data: {
        name: 'a name',
        description: 'a description'
      }
    }
    try {
      parseData(context)
      const { data } = context

      assert(data['description']['en'] === 'a description', 'we have a modified the data to map the language')
      done()
    } catch (error) {
      done(error)
    }
  })

  it('transforms the data (array)', function (done) {
    const context = {
      type: 'before',
      method: 'create',
      data: [
        {
          name: 'a name',
          description: 'a description'
        },
        {
          name: 'another name',
          description: 'another description'
        }
      ]
    }
    try {
      parseData(context)
      const { data } = context

      assert(data[0]['description']['en'] === 'a description', 'we have a modified the data to map the language')
      assert(data[1]['description']['en'] === 'another description', 'we have a modified the data to map the language')
      done()
    } catch (error) {
      done(error)
    }
  })

  it('respects already nested data', function (done) {
    const context = {
      type: 'before',
      method: 'create',
      data: [
        {
          name: 'a name',
          description: {
            fr: 'a description'
          }
        },
        {
          name: 'another name',
          description: 'another description'
        }
      ]
    }
    try {
      parseData(context)
      const { data } = context

      assert(data[0]['description']['fr'] === 'a description', 'we have a modified the data to map the language')
      assert(data[1]['description']['en'] === 'another description', 'we have a modified the data to map the language')
      done()
    } catch (error) {
      done(error)
    }
  })
})
