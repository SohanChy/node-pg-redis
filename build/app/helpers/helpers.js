"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ApiError = exports.wrap = exports.extractFilters = exports.dataGet = exports.transformResponseToCoreStyle = void 0;

require("core-js/modules/es6.array.index-of");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.map");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

require("core-js/modules/es6.regexp.split");

require("regenerator-runtime/runtime");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var ApiError = function ApiError(message) {
  var status = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 400;
  var error = new Error(message);
  error.status = status;
  return error;
};

exports.ApiError = ApiError;

var dataGet =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(data, key) {
    var fallback,
        keysInOrder,
        dataIterator,
        currentKey,
        _args = arguments;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            fallback = _args.length > 2 && _args[2] !== undefined ? _args[2] : null;
            keysInOrder = key.split(".");
            dataIterator = data;
            currentKey = keysInOrder.shift();

          case 4:
            if (!(currentKey !== undefined)) {
              _context.next = 13;
              break;
            }

            if (!Object.prototype.hasOwnProperty.call(dataIterator, currentKey)) {
              _context.next = 10;
              break;
            }

            dataIterator = dataIterator[currentKey];
            currentKey = keysInOrder.shift();
            _context.next = 11;
            break;

          case 10:
            return _context.abrupt("return", fallback);

          case 11:
            _context.next = 4;
            break;

          case 13:
            return _context.abrupt("return", dataIterator);

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function dataGet(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.dataGet = dataGet;

var extractFilters = function extractFilters(queryParams, allowedFilters) {
  // const allowedFilters = ['status','batch_number','campaign_code'];
  var appliedFilters = [];
  Object.keys(queryParams).map(function (f) {
    if (allowedFilters.indexOf(f) != -1) {
      appliedFilters[f] = queryParams[f];
    }
  });

  if (Object.keys(appliedFilters).length === 0) {
    throw ApiError("At least one filter parameter is required", 400); // return res.status(400).json({
    //     success: false,
    //     message: "At least one filter parameter is required"
    //     })
  }

  return appliedFilters;
};

exports.extractFilters = extractFilters;

var transformResponseToCoreStyle = function transformResponseToCoreStyle(result) {
  var showTotalCount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var data = {
    error: false,
    data: result.data ? result.data : result
  };

  if (result.paginator) {
    data.meta = {
      pageNumber: result.paginator.page,
      dataLength: result.paginator.dataLength
    };

    if (showTotalCount) {
      data.meta.totalCount = result.paginator.total;
    }
  }

  return data;
};
/**
 * Wrap route function for errors
 * @param  {function} func controller function to be listened for errors
 * @return {void}
*/


exports.transformResponseToCoreStyle = transformResponseToCoreStyle;

var wrap = function wrap(func) {
  return (
    /*#__PURE__*/
    function () {
      var _ref2 = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(req, res, next) {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return func(req, res, next);

              case 3:
                return _context2.abrupt("return", _context2.sent);

              case 6:
                _context2.prev = 6;
                _context2.t0 = _context2["catch"](0);
                next(_context2.t0);

              case 9:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 6]]);
      }));

      return function (_x3, _x4, _x5) {
        return _ref2.apply(this, arguments);
      };
    }()
  );
};

exports.wrap = wrap;
//# sourceMappingURL=helpers.js.map