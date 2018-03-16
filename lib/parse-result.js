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

  const isPaginated = result.data && Array.isArray(result.data)

  if (isPaginated || Array.isArray(result)) {
    const data = (isPaginated ? result.data : result).map(result => parseResult(result, language, props))
    if (isPaginated) {
      result.data = data
    } else {
      result = data
    }
  } else {
    Object.keys(result)
      .map(key => {
        if (props.includes(key)) {
          // Find data of specified language, otherwise fallback to default
          const data = result[key][language] || result[key][defaults.language]
          result = Object.assign({}, result, { [key]: data })
        }
      })
  }

  return result
}
