'use strict'; // Simple helper method to create new errors with a specific status value
// attached to them, to match up with the codes and methods below.

var createError = function createError(_ref) {
  var _ref$status = _ref.status,
      status = _ref$status === void 0 ? 500 : _ref$status,
      _ref$message = _ref.message,
      message = _ref$message === void 0 ? 'Something went wrong' : _ref$message;
  var error = new Error(message);
  error.status = status;
  return error;
};

module.exports = {
  createError: createError,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  CONFLICT: 409,
  NOT_FOUND: 404,
  UNPROCESSABLE: 422,
  GENERIC_ERROR: 500
};
//# sourceMappingURL=error_helper.js.map