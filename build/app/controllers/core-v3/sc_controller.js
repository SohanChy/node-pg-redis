'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCards = getCards;
exports.checkCard = checkCard;
exports.getInventory = getInventory;
exports.getRetailerSales = getRetailerSales;
exports.getInventoryStatusBySerial = getInventoryStatusBySerial;

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

require("regenerator-runtime/runtime");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { keys.push.apply(keys, Object.getOwnPropertySymbols(object)); } if (enumerableOnly) keys = keys.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var _require = require('../../models'),
    Scratchcard = _require.Scratchcard,
    Project = _require.Project;

var _require2 = require("../../helpers/helpers"),
    transformResponseToCoreStyle = _require2.transformResponseToCoreStyle,
    extractFilters = _require2.extractFilters;

var knex = require('../../../config/database');
/**
 * get scratch cards using filters 
 */


function getCards(_x, _x2, _x3) {
  return _getCards.apply(this, arguments);
}

function _getCards() {
  _getCards = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(req, res, next) {
    var appliedFilters, qb, scs;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            appliedFilters = extractFilters(req.query, ['status', 'batch_number', 'campaign_code']);
            qb = Scratchcard.filteredQueryBuilder(appliedFilters);
            _context.next = 4;
            return Scratchcard.paginateQuery(qb, req.query)["catch"](next);

          case 4:
            scs = _context.sent;
            return _context.abrupt("return", res.json(transformResponseToCoreStyle(scs)));

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getCards.apply(this, arguments);
}

function checkCard(_x4, _x5, _x6) {
  return _checkCard.apply(this, arguments);
}
/**
 * GET scratch cards inventory
 * Note that it will only return the cards which are not SOLD by retailers, Not used and Active
 */


function _checkCard() {
  _checkCard = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(req, res, next) {
    var appliedFilters, qb, scs;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            appliedFilters = extractFilters(req.query, ['serial_no', 'card_no']);
            qb = Scratchcard.filteredQueryBuilder(appliedFilters);
            _context2.next = 4;
            return qb.first()["catch"](next);

          case 4:
            scs = _context2.sent;
            return _context2.abrupt("return", res.json({
              error: false,
              data: scs
            }));

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _checkCard.apply(this, arguments);
}

function getInventory(_x7, _x8, _x9) {
  return _getInventory.apply(this, arguments);
}
/**
 * GET scratch cards statuses which has been assigned to a specific retailer
 */


function _getInventory() {
  _getInventory = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3(req, res, next) {
    var qb, cond, scs;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            qb = Scratchcard.queryBuilder(['campaign_code', 'serial_no', 'added_on', 'inventory_info']);
            cond = "status = 'Active' AND (inventory_info->>'inventory_status'='WITH_RETAILER' OR inventory_info->>'inventory_status'='IN_INVENTORY') ";

            if (req.query.retailernumber) {
              cond = cond + " AND inventory_info->>'retailernumber'='".concat(req.query.retailernumber, "'");
            }

            qb.whereRaw(cond);
            _context3.next = 6;
            return Scratchcard.paginateQuery(qb, req.query)["catch"](next);

          case 6:
            scs = _context3.sent;
            return _context3.abrupt("return", res.json(transformResponseToCoreStyle(scs)));

          case 8:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _getInventory.apply(this, arguments);
}

function getRetailerSales(_x10, _x11, _x12) {
  return _getRetailerSales.apply(this, arguments);
}
/**
 * GET inventory status of a card by serial number
 */


function _getRetailerSales() {
  _getRetailerSales = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee4(req, res, next) {
    var filter, qb, scs;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            filter = '';

            if (req.query.inventory_status) {
              filter = "AND inventory_info->>'inventory_status'='".concat(req.query.inventory_status, "'");
            }

            qb = Scratchcard.rawQueryBuilder();
            qb.select(knex.raw('scratch_card.campaign_code, serial_no, campaigns.charge_amount charge_amount, inventory_info')).leftJoin('campaigns', 'campaigns.campaign_code', 'scratch_card.campaign_code').whereRaw("inventory_info->>'retailernumber'='".concat(req.params.retailernumber, "' ").concat(filter)).orderBy('scratch_card.id', 'asc');
            _context4.next = 6;
            return Scratchcard.paginateQuery(qb, req.query, true)["catch"](next);

          case 6:
            scs = _context4.sent;
            return _context4.abrupt("return", res.json(transformResponseToCoreStyle(scs, true)));

          case 8:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _getRetailerSales.apply(this, arguments);
}

function getInventoryStatusBySerial(_x13, _x14, _x15) {
  return _getInventoryStatusBySerial.apply(this, arguments);
}

function _getInventoryStatusBySerial() {
  _getInventoryStatusBySerial = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee5(req, res, next) {
    var qb, scs;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            qb = Scratchcard.rawQueryBuilder();
            qb.select('scratch_card.campaign_code', 'scratch_card.serial_no', 'scratch_card.status', 'campaigns.charge_amount', 'scratch_card.added_on', 'scratch_card.inventory_info').where('serial_no', req.params.serial_no).leftJoin('campaigns', 'scratch_card.campaign_code', 'campaigns.campaign_code');
            _context5.next = 4;
            return qb.first()["catch"](next);

          case 4:
            scs = _context5.sent;
            return _context5.abrupt("return", res.json(transformResponseToCoreStyle(scs)));

          case 6:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _getInventoryStatusBySerial.apply(this, arguments);
}

var postProjects = function postProjects(req, res, next) {
  var userId = req.params.id;
  var props = req.body.project;
  Project.create(_objectSpread({}, props, {
    user_id: userId
  })).then(function (project) {
    return res.json({
      ok: true,
      message: 'Project created',
      project: project,
      userId: userId
    });
  })["catch"](next);
};

var getProjects = function getProjects(req, res, next) {
  var userId = req.params.id;
  Project.findAll().then(function (projects) {
    return res.json({
      ok: true,
      message: 'Projects found',
      projects: projects,
      userId: userId
    });
  })["catch"](next);
};

var getProject = function getProject(req, res, next) {
  var projectId = req.params.id;
  Project.findById(projectId).then(function (project) {
    return res.json({
      ok: true,
      message: 'Project found',
      project: project
    });
  })["catch"](next);
};

var putProject = function putProject(req, res, next) {
  var projectId = req.params.id;
  var props = req.body.project;
  Project.update(projectId, props).then(function (project) {
    return res.json({
      ok: true,
      message: 'Project updated',
      project: project
    });
  })["catch"](next);
};

var deleteProject = function deleteProject(req, res, next) {
  var projectId = req.params.id;
  Project.destroy(projectId).then(function (deleteCount) {
    return res.json({
      ok: true,
      message: 'Project deleted',
      deleteCount: deleteCount
    });
  })["catch"](next);
};

module.exports = {
  postProjects: postProjects,
  getProjects: getProjects,
  getProject: getProject,
  putProject: putProject,
  deleteProject: deleteProject,
  getCards: getCards,
  checkCard: checkCard,
  getInventory: getInventory,
  getRetailerSales: getRetailerSales,
  getInventoryStatusBySerial: getInventoryStatusBySerial
};
//# sourceMappingURL=sc_controller.js.map