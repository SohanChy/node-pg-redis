'use strict'

const createGuts = require('../helpers/model-guts')

const name = 'Scratchcard'
const tableName = 'scratch_card'

const selectableProps = ['*']

module.exports = knex => {
  const guts = createGuts({
    knex,
    name,
    tableName,
    selectableProps
  })

  return {
    ...guts
  }
}
