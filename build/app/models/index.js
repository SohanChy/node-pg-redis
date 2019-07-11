'use strict';

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.array.map");

var fs = require('fs');

var path = require('path');

var knex = require('../../config/database');

var getModelFiles = function getModelFiles(dir) {
  return fs.readdirSync(dir).filter(function (file) {
    return file.indexOf('.') !== 0 && file !== 'index.js';
  }).map(function (file) {
    return path.join(dir, file);
  });
}; // Gather up all model files (i.e., any file present in the current directory
// that is not this file) and export them as properties of an object such that
// they may be imported using destructuring like
// `const { MyModel } = require('./models')` where there is a model named
// `MyModel` present in the exported object of gathered models.


var files = getModelFiles(__dirname);
var models = files.reduce(function (modelsObj, filename) {
  var initModel = require(filename);

  var model = initModel(knex);
  if (model) modelsObj[model.name] = model;
  return modelsObj;
}, {});
module.exports = models;
//# sourceMappingURL=index.js.map