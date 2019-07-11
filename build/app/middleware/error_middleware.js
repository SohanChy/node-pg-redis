'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.map");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es7.object.entries");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { keys.push.apply(keys, Object.getOwnPropertySymbols(object)); } if (enumerableOnly) keys = keys.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var _require = require('../helpers/error_helper'),
    BAD_REQUEST = _require.BAD_REQUEST,
    UNAUTHORIZED = _require.UNAUTHORIZED,
    FORBIDDEN = _require.FORBIDDEN,
    CONFLICT = _require.CONFLICT,
    NOT_FOUND = _require.NOT_FOUND,
    UNPROCESSABLE = _require.UNPROCESSABLE,
    GENERIC_ERROR = _require.GENERIC_ERROR;

var unauthorized = function unauthorized(err, req, res, next) {
  if (err.status !== UNAUTHORIZED) return next(err);
  delete err.status;
  res.status(UNAUTHORIZED).send({
    error: true,
    message: err.message || 'Unauthorized',
    errors: [err]
  });
};

var forbidden = function forbidden(err, req, res, next) {
  if (err.status !== FORBIDDEN) return next(err);
  delete err.status;
  res.status(FORBIDDEN).send({
    error: true,
    message: err.message || 'Forbidden',
    errors: [err]
  });
};

var conflict = function conflict(err, req, res, next) {
  if (err.status !== CONFLICT) return next(err);
  delete err.status;
  var error = {
    error: true,
    message: err.message || 'Conflict'
  };
  var hasErrors = Object.entries(err).length === 0 && err.constructor === Object;

  if (hasErrors) {
    error.errors = [err];
  }

  res.status(CONFLICT).send(error);
};

var badRequest = function badRequest(err, req, res, next) {
  if (err.status !== BAD_REQUEST) return next(err);
  delete err.status;
  var error = {
    error: true,
    message: err.message || 'Bad Request'
  };
  var hasErrors = Object.entries(err).length === 0 && err.constructor === Object;

  if (hasErrors) {
    error.errors = [err];
  }

  res.status(BAD_REQUEST).send(error);
};

var unprocessable = function unprocessable(err, req, res, next) {
  if (err.status !== UNPROCESSABLE) return next(err);
  delete err.status;
  var error = {
    error: true,
    message: err.message || 'Unprocessable entity'
  };
  var hasErrors = Object.entries(err).length === 0 && err.constructor === Object;

  if (hasErrors) {
    error.errors = [err];
  }

  res.status(UNPROCESSABLE).send(error);
}; // If there's nothing left to do after all this (and there's no error),
// return a 404 error.


var notFound = function notFound(err, req, res, next) {
  if (err.status !== NOT_FOUND) return next(err);
  delete err.status;
  res.status(NOT_FOUND).send({
    error: true,
    message: err.message || 'The requested resource could not be found'
  });
}; // If there's still an error at this point, return a generic 500 error.


var genericError = function genericError(err, req, res, next) {
  console.log(err);
  delete err.status;
  res.status(GENERIC_ERROR).send({
    error: true,
    message: err.message || 'Internal server error',
    errors: [err]
  });
}; // If there's nothing left to do after all this (and there's no error),
// return a 404 error.


var catchall = function catchall(req, res, next) {
  res.status(NOT_FOUND).send({
    error: true,
    message: 'The requested resource could not be found'
  });
};

var exportables = {
  unauthorized: unauthorized,
  forbidden: forbidden,
  conflict: conflict,
  badRequest: badRequest,
  unprocessable: unprocessable,
  genericError: genericError,
  notFound: notFound,
  catchall: catchall // All exportables stored as an array (e.g., for including in Express app.use())

};
var all = Object.keys(exportables).map(function (key) {
  return exportables[key];
});
module.exports = _objectSpread({}, exportables, {
  all: all
});
//# sourceMappingURL=error_middleware.js.map