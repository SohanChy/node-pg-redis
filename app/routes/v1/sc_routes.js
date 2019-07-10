'use strict'

const router = require('express').Router()
const { wrap } = require('../../helpers/helpers')

const {
  getCards,
  // checkCard,
  postProjects,
  getProjects,
  getProject,
  putProject,
  deleteProject
} = require('../../controllers/sc_controller')

router.route('/cards')
  .get(wrap(getCards))

// router.route('/cards/check')
  // .get(checkCard)

router.route('/users/:id/projects')
  .post(postProjects)
  .get(getProjects)

router.route('/projects/:id')
  .get(getProject)
  .put(putProject)
  .delete(deleteProject)

module.exports = router
