'use strict'

const router = require('express').Router()
const { wrap } = require('../../helpers/helpers')

const {
  getCards,
  checkCard,
  getInventory,
  getRetailerSales,
  getInventoryStatusBySerial,
  postProjects,
  getProjects,
  getProject,
  putProject,
  deleteProject
} = require('../../controllers/core-v3/sc_controller')

router.route('/').get(wrap(getCards))
router.route('/check').get(wrap(checkCard))
router.route('/inventory').get(wrap(getInventory))
router.route('/inventory/retailerSales/:retailernumber').get(wrap(getRetailerSales))
router.route('/inventory/cardStatus/:serial_no').get(wrap(getInventoryStatusBySerial))

router.route('/users/:id/projects').post(postProjects).get(getProjects)
router.route('/projects/:id').get(getProject).put(putProject).delete(deleteProject)

module.exports = router