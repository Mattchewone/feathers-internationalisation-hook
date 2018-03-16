const assert = require('assert')
const makeHook = require('../lib/parse-result')

const parseResult = makeHook({ fields: ['title', 'description'] })

describe('Result', function () {
  it('transforms the result as object', function (done) {
    const context = {
      type: 'after',
      result: {
        title: {
          en: 'a huge title'
        },
        date: 'a date'
      }
    }
    try {
      parseResult(context)
      const { result } = context

      assert(result.title === 'a huge title', 'we have converted the title')
      assert(result.date === 'a date', 'date has not been modified')
      done()
    } catch (error) {
      done(error)
    }
  })

  it('transforms the result as array (not-paginated)', function (done) {
    const context = {
      type: 'after',
      result: [
        {
          title: {
            en: 'a huge title'
          },
          date: 'a date'
        },
        {
          title: {
            en: 'another title'
          },
          description: {
            en: 'a description',
            fr: 'a la french description'
          },
          date: 'a date'
        }
      ]
    }
    try {
      parseResult(context)
      const { result } = context

      assert(result[0].title === 'a huge title', 'we have converted the title')
      assert(result[0].date === 'a date', 'date has not been modified')

      assert(result[1].title === 'another title', 'we have converted the title')
      assert(result[1].description === 'a description', 'we have the correct description')
      assert(result[1].date === 'a date', 'date has not been modified')
      done()
    } catch (error) {
      done(error)
    }
  })

  it('transforms the result as array (paginated)', function (done) {
    const context = {
      type: 'after',
      result: {
        data: [
          {
            title: {
              en: 'a huge title'
            },
            date: 'a date'
          },
          {
            title: {
              en: 'another title'
            },
            description: {
              en: 'a description',
              fr: 'a la french description'
            },
            date: 'a date'
          }
        ]
      }
    }
    try {
      parseResult(context)
      const { result } = context

      assert(result.data[0].title === 'a huge title', 'we have converted the title')
      assert(result.data[0].date === 'a date', 'date has not been modified')

      assert(result.data[1].title === 'another title', 'we have converted the title')
      assert(result.data[1].description === 'a description', 'we have the correct description')
      assert(result.data[1].date === 'a date', 'date has not been modified')
      done()
    } catch (error) {
      done(error)
    }
  })

  it('can change language (fallback to en)', function (done) {
    const context = {
      type: 'after',
      result: {
        data: [
          {
            title: {
              en: 'a huge title'
            },
            date: 'a date'
          },
          {
            title: {
              en: 'another title'
            },
            description: {
              en: 'a description',
              fr: 'a la french description'
            },
            date: 'a date'
          }
        ]
      }
    }
    try {
      makeHook({ fields: ['title', 'description'], language: 'fr' })(context)
      const { result } = context

      assert(result.data[0].title === 'a huge title', 'we have converted the title')
      assert(result.data[0].date === 'a date', 'date has not been modified')

      assert(result.data[1].title === 'another title', 'we have converted the title')
      assert(result.data[1].description === 'a la french description', 'we have the correct description')
      assert(result.data[1].date === 'a date', 'date has not been modified')
      done()
    } catch (error) {
      done(error)
    }
  })
})
