#!/usr/bin/env node

'use strict'

const PORT = process.env.APP_PORT || 3000

const app = require('../app')

app.listen(PORT, () => {
  console.log(`Server started on port ${ PORT }`)
}).on('error', err => {
  console.log('ERROR: ', err)
})
