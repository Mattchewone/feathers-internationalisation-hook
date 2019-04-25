const assert = require('assert')
const makeHook = require('../lib/parse-result')

const parseResult = makeHook({ fields: ['title', 'description'] })

describe('Result', function () {
  it('empty description string', function () {
    const context = {
      type: 'after',
      result: {
        data: [
          {
            title: {
              en: 'another title'
            },
            description: {
              en: ''
            }
          }
        ]
      }
    }

    makeHook({ fields: ['title', 'description'], language: 'en' })(context)
    const { result } = context

    assert.strictEqual(result.data[0].title, 'another title', 'we have converted the title')
    assert.strictEqual(result.data[0].description, '', 'we have the correct description')
  })

  it('transforms the result as object', function () {
    const context = {
      type: 'after',
      result: {
        title: {
          en: 'a huge title'
        },
        date: 'a date'
      }
    }

    parseResult(context)
    const { result } = context

    assert.strictEqual(result.title, 'a huge title', 'we have converted the title')
    assert.strictEqual(result.date, 'a date', 'date has not been modified')
  })

  it('transforms the empty string', function () {
    const context = {
      type: 'after',
      result: {
        data:
        [{
          title: {
            en: ''
          },
          description: {
            en: ''
          }
        }]
      }
    }

    parseResult(context)
    const { result } = context
    assert.strictEqual(result.data[0].title, '', 'Output not matched !!!! ??? error')
    assert.strictEqual(result.data[0].description, '', 'Empty str')
  })

  it('ignores already transformed result', function () {
    const context = {
      type: 'after',
      result: {
        title: 'a huge title',
        date: 'a date'
      }
    }

    parseResult(context)
    const { result } = context

    assert.strictEqual(result.title, 'a huge title', 'we have converted the title')
    assert.strictEqual(result.date, 'a date', 'date has not been modified')
  })

  it('transforms the result as array (not-paginated)', function () {
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

    parseResult(context)
    const { result } = context

    assert.strictEqual(result[0].title, 'a huge title', 'we have converted the title')
    assert.strictEqual(result[0].date, 'a date', 'date has not been modified')

    assert.strictEqual(result[1].title, 'another title', 'we have converted the title')
    assert.strictEqual(result[1].description, 'a description', 'we have the correct description')
    assert.strictEqual(result[1].date, 'a date', 'date has not been modified')
  })

  it('transforms the result as array (paginated)', function () {
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

    parseResult(context)
    const { result } = context

    assert.strictEqual(result.data[0].title, 'a huge title', 'we have converted the title')
    assert.strictEqual(result.data[0].date, 'a date', 'date has not been modified')

    assert.strictEqual(result.data[1].title, 'another title', 'we have converted the title')
    assert.strictEqual(result.data[1].description, 'a description', 'we have the correct description')
    assert.strictEqual(result.data[1].date, 'a date', 'date has not been modified')
  })

  it('can change language (fallback to en)', function () {
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

    makeHook({ fields: ['title', 'description'], language: 'fr' })(context)
    const { result } = context

    assert.strictEqual(result.data[0].title, 'a huge title', 'we have converted the title')
    assert.strictEqual(result.data[0].date, 'a date', 'date has not been modified')

    assert.strictEqual(result.data[1].title, 'another title', 'we have converted the title')
    assert.strictEqual(result.data[1].description, 'a la french description', 'we have the correct description')
    assert.strictEqual(result.data[1].date, 'a date', 'date has not been modified')
  })
})
