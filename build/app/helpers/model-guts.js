'use strict'; // The guts of a model that uses Knexjs to store and retrieve data from a
// database using the provided `knex` instance. Custom functionality can be
// composed on top of this set of common guts.
//
// The idea is that these are the most-used types of functions that most/all
// "models" will want to have. They can be overriden/modified/extended if
// needed by composing a new object out of the one returned by this function ;)

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.array.is-array");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

require("regenerator-runtime/runtime");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

require("core-js/modules/es6.function.name");

module.exports = function (_ref) {
  var _ref$knex = _ref.knex,
      knex = _ref$knex === void 0 ? {} : _ref$knex,
      _ref$name = _ref.name,
      name = _ref$name === void 0 ? 'name' : _ref$name,
      _ref$tableName = _ref.tableName,
      tableName = _ref$tableName === void 0 ? 'tablename' : _ref$tableName,
      _ref$selectableProps = _ref.selectableProps,
      selectableProps = _ref$selectableProps === void 0 ? [] : _ref$selectableProps,
      _ref$timeout = _ref.timeout,
      timeout = _ref$timeout === void 0 ? parseInt(process.env.DB_TIMEOUT) || 5 : _ref$timeout;

  var Paginator = function Paginator(total, limit, offset, dataLength, page) {
    (0, _classCallCheck2["default"])(this, Paginator);
    this.total = parseInt(total);
    this.dataLength = dataLength, this.limit = limit;
    this.offset = offset;
    this.from = offset + 1;
    this.to = offset + dataLength;
    this.page = page;
    this.lastPage = Math.ceil(total / limit);
  };

  var rawQueryBuilder = function rawQueryBuilder() {
    return knex('scratch_card').timeout(timeout);
  };

  var queryBuilder = function queryBuilder() {
    var selectableProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : selectableProps;
    return knex.select(selectableProps).from(tableName).timeout(timeout);
  };

  var filteredQueryBuilder = function filteredQueryBuilder() {
    var filters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var selectableProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : selectableProps;
    var knexQb = knex.select(selectableProps).from(tableName).timeout(timeout);

    for (var filterKey in filters) {
      knexQb.where(filterKey, filters[filterKey]);
    }

    return knexQb;
  };

  var paginateQuery =
  /*#__PURE__*/
  function () {
    var _ref2 = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee(knexQb, query) {
      var count,
          limit,
          page,
          offset,
          data,
          total,
          _args = arguments;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              count = _args.length > 2 && _args[2] !== undefined ? _args[2] : false;
              limit = parseInt(query.limit) || 200;
              page = parseInt(query.page) || 1;
              offset = (page - 1) * limit;
              data = null;
              total = null;

              if (!count) {
                _context.next = 15;
                break;
              }

              _context.next = 9;
              return knex.count('* as total').from(knexQb.clone().as('inner')).first();

            case 9:
              total = _context.sent.total;
              _context.next = 12;
              return knexQb.offset(offset).limit(limit);

            case 12:
              data = _context.sent;
              _context.next = 19;
              break;

            case 15:
              _context.next = 17;
              return knexQb.offset(offset).limit(limit);

            case 17:
              data = _context.sent;
              total = data.length;

            case 19:
              return _context.abrupt("return", {
                paginator: new Paginator(total, limit, offset, data.length, page),
                data: data
              });

            case 20:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function paginateQuery(_x, _x2) {
      return _ref2.apply(this, arguments);
    };
  }();

  var create = function create(props) {
    delete props.id; // not allowed to set `id`

    return knex.insert(props).returning(selectableProps).into(tableName).timeout(timeout);
  };

  var findAll = function findAll() {
    return knex.select(selectableProps).from(tableName).timeout(timeout);
  };

  var find = function find(filters) {
    return knex.select(selectableProps).from(tableName).where(filters).timeout(timeout);
  }; // Same as `find` but only returns the first match if >1 are found.


  var findOne = function findOne(filters) {
    return find(filters).then(function (results) {
      if (!Array.isArray(results)) return results;
      return results[0];
    });
  };

  var findById = function findById(id) {
    return knex.select(selectableProps).from(tableName).where({
      id: id
    }).timeout(timeout);
  };

  var update = function update(id, props) {
    delete props.id; // not allowed to set `id`

    return knex.update(props).from(tableName).where({
      id: id
    }).returning(selectableProps).timeout(timeout);
  };

  var destroy = function destroy(id) {
    return knex.del().from(tableName).where({
      id: id
    }).timeout(timeout);
  };

  return {
    name: name,
    tableName: tableName,
    selectableProps: selectableProps,
    timeout: timeout,
    create: create,
    findAll: findAll,
    find: find,
    findOne: findOne,
    findById: findById,
    update: update,
    destroy: destroy,
    queryBuilder: queryBuilder,
    paginateQuery: paginateQuery,
    filteredQueryBuilder: filteredQueryBuilder,
    rawQueryBuilder: rawQueryBuilder
  };
};
//# sourceMappingURL=model-guts.js.map