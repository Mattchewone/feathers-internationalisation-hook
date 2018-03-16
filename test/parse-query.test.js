const assert = require('assert')
const makeHook = require('../lib/parse-query')

const parseQuery = makeHook({ fields: ['title', 'description'] })

describe('Query', function () {
  it('transforms the query based on language', function (done) {
    const context = {
      type: 'before',
      method: 'find',
      params: {
        query: {
          description: 'a description',
          name: 'a name'
        }
      }
    }
    try {
      parseQuery(context)
      const { params } = context
      const { query } = params

      assert(query['description.en'] === 'a description', 'we have a modified the query to map the language')
      assert(!query.hasOwnProperty('description'), 'we do not still have the description property')
      assert(query.name === 'a name', 'name has not changed')
      done()
    } catch (error) {
      done(error)
    }
  })

  it('transforms the query with arrays ($in)', function (done) {
    const context = {
      type: 'before',
      method: 'find',
      params: {
        query: {
          $in: [
            { description: 'first description' },
            { description: 'second description' }
          ],
          name: 'a name'
        }
      }
    }
    try {
      parseQuery(context)
      const { params } = context
      const { query } = params

      assert(query['$in'][0]['description.en'] === 'first description', 'we have a modified the query to map the language')
      assert(query['$in'][1]['description.en'] === 'second description', 'we have a modified the query to map the language')
      assert(!query['$in'][0].hasOwnProperty('description'), 'we do not still have the description property')
      assert(!query['$in'][1].hasOwnProperty('description'), 'we do not still have the description property')
      assert(query.name === 'a name', 'name has not changed')
      done()
    } catch (error) {
      done(error)
    }
  })

  it('transforms the query with $in', function (done) {
    const context = {
      type: 'before',
      method: 'find',
      params: {
        query: {
          description: {
            $in: [
              'first description',
              'second description'
            ]
          },
          name: 'a name'
        }
      }
    }
    try {
      parseQuery(context)
      const { params } = context
      const { query } = params

      assert(query['description.en']['$in'][0] === 'first description', 'we have a modified the query to map the language')
      assert(query['description.en']['$in'][1] === 'second description', 'we have a modified the query to map the language')
      assert(query.name === 'a name', 'name has not changed')
      done()
    } catch (error) {
      done(error)
    }
  })
})
