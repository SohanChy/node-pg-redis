'use strict'

const router = require('express').Router()

const {
  getCards,
  postProjects,
  getProjects,
  getProject,
  putProject,
  deleteProject
} = require('../../controllers/sc_controller')

router.route('/cards')
  .get(getCards)

router.route('/users/:id/projects')
  .post(postProjects)
  .get(getProjects)

router.route('/projects/:id')
  .get(getProject)
  .put(putProject)
  .delete(deleteProject)

module.exports = router
