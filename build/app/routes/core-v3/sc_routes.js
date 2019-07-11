'use strict';

var router = require('express').Router();

var _require = require('../../helpers/helpers'),
    wrap = _require.wrap;

var _require2 = require('../../controllers/core-v3/sc_controller'),
    getCards = _require2.getCards,
    checkCard = _require2.checkCard,
    getInventory = _require2.getInventory,
    getRetailerSales = _require2.getRetailerSales,
    getInventoryStatusBySerial = _require2.getInventoryStatusBySerial,
    postProjects = _require2.postProjects,
    getProjects = _require2.getProjects,
    getProject = _require2.getProject,
    putProject = _require2.putProject,
    deleteProject = _require2.deleteProject;

router.route('/').get(wrap(getCards));
router.route('/check').get(wrap(checkCard));
router.route('/inventory').get(wrap(getInventory));
router.route('/inventory/retailerSales/:retailernumber').get(wrap(getRetailerSales));
router.route('/inventory/cardStatus/:serial_no').get(wrap(getInventoryStatusBySerial));
router.route('/users/:id/projects').post(postProjects).get(getProjects);
router.route('/projects/:id').get(getProject).put(putProject)["delete"](deleteProject);
module.exports = router;
//# sourceMappingURL=sc_routes.js.map