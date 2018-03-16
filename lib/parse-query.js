const errors = require('@feathersjs/errors')
const { getType } = require('./utils')

const defaults = {
  fields: [],
  language: 'en'
}

module.exports = function (options) {
  options = Object.assign({}, defaults, options)

  return function i18nFieldMap (context) {
    const { type } = context

    if (type !== 'before') {
      throw new errors.Forbidden('parseI18nQuery can only be run on a `before` hook.')
    }

    context.params.query = parseQuery(context.params.query, options.language, options.fields)

    return context
  }
}

/**
 * This will create a nested query such as { 'description.en': 'something' }
 * from this { description: 'something' }
 * @param {Array|Object} query the query to be modified
 * @param {String} language the language the query is to be modified with
 * @param {Array} props array of props to replace
 */
function parseQuery (query, language, props = []) {
  if (query === null || query === undefined) {
    return null
  }

  Object.keys(query)
    .map(key => {
      const value = query[key]
      const type = getType(value)

      if (type === 'array') {
        query[key] = value.map(value => {
          let data = parseQuery(value, language, props)
          return data
        })
      } else {
        if (props.includes(key)) {
          delete query[key]
          query = Object.assign({}, query, { [`${key}.${language}`]: value })
        }
      }
    })

  return query
}
