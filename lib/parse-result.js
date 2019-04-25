const errors = require('@feathersjs/errors')

const defaults = {
  fields: [],
  language: 'en'
}

module.exports = function (options) {
  options = Object.assign({}, defaults, options)

  return function parseI18nResult (context) {
    const { type } = context

    if (type !== 'after') {
      throw new errors.Forbidden('`parseI18nResult` can only be run on a `after` hook.')
    }

    if (!options.language) options.language = 'en'

    context.result = parseResult(context.result, options.language, options.fields)

    return context
  }
}

/**
 * This will replace a nested object such as { description: { en: 'something' } }
 * with { description: 'something' }
 * @param {Array|Object} result the data to be modified
 * @param {String} language the language data to replace the nested object with
 * @param {Array} props array of props to replace
 */
function parseResult (result, language, props = []) {
  if (result === null || result === undefined) {
    return null
  }

  let data = [].concat(result.data || result)

  data.forEach((item, index) => {
    Object.keys(item)
      .forEach(key => {
        if (props.includes(key)) {
          // Find data of specified language, otherwise fallback to default
          let res = data[index][key][language] || data[index][key][defaults.language]
          if (res || res === '') {
            Object.assign(data[index], { [key]: res })
          }
        }
      })
  })

  return result
}
