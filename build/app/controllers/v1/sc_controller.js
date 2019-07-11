'use strict'; // const { Scratchcard, Project } = require('../models')

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

require("regenerator-runtime/runtime");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _redis = _interopRequireDefault(require("../../redis"));

var _require = require("../../helpers/helpers"),
    transformResponseToCoreStyle = _require.transformResponseToCoreStyle,
    extractFilters = _require.extractFilters,
    ApiError = _require.ApiError; // const knex = require('../../config/database')


function isValidCard(cardno) {
  if (cardno.length !== 12) {
    var e = new Error('Card no is invalid');
    e.status = 422;
    throw e;
  }
}

var lockCardTemporarily =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(req, res) {
    var cardno, cardKey, isLocked;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            cardno = req.params.card_no;
            isValidCard(cardno);
            cardKey = 'lock:sc:' + cardno;
            _context.next = 5;
            return _redis["default"].getAsync(cardKey);

          case 5:
            isLocked = _context.sent;

            if (!isLocked) {
              _context.next = 10;
              break;
            }

            throw ApiError("Sorry, Card is being used at the moment and it is already locked!", 409);

          case 10:
            isLocked = _redis["default"].setAsync(cardKey, true);

          case 11:
            if (!isLocked) {
              _context.next = 15;
              break;
            }

            res.json({
              error: false,
              message: "Card has been locked."
            });
            _context.next = 16;
            break;

          case 15:
            throw ApiError("Sorry, failed to lock card'!", 500);

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function lockCardTemporarily(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var unlockCard =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(req, res) {
    var cardno, cardKey, result;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            cardno = req.params.card_no;
            isValidCard(cardno);
            cardKey = 'lock:sc:' + cardno;
            _context2.next = 5;
            return _redis["default"].delAsync(cardKey);

          case 5:
            result = _context2.sent;

            if (!result) {
              _context2.next = 10;
              break;
            }

            return _context2.abrupt("return", res.json({
              error: result,
              message: "Card has been unlocked."
            }));

          case 10:
            throw ApiError("Card was already unlocked!", 422);

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function unlockCard(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

module.exports = {
  lockCardTemporarily: lockCardTemporarily,
  unlockCard: unlockCard
};
//# sourceMappingURL=sc_controller.js.map