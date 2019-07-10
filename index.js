'use strict'

const { User } = require('./app/models')

User.create({
  username: 'admin',
  password: 'password',
  email: 'admin@email.com'
})
