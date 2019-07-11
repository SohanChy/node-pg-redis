"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.function.bind");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _redis = _interopRequireWildcard(require("redis"));

var client = (0, _redis.createClient)();

var _require = require('util'),
    promisify = _require.promisify;

var redisObject = function redisObject() {
  (0, _classCallCheck2["default"])(this, redisObject);
  this.redis = _redis["default"];
  this.client = client;
  this.getAsync = promisify(client.get).bind(client);
  this.setAsync = promisify(client.set).bind(client);
  this.delAsync = promisify(client.del).bind(client);
};

client.on('connect', function () {
  console.log('Redis client connected');
});
client.on('error', function (err) {
  console.log('Something went wrong ' + err);
});

var _default = new redisObject();

exports["default"] = _default;
//# sourceMappingURL=redis.js.map