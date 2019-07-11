'use strict';

require("core-js/modules/es6.array.map");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

var _require = require('../../server/models'),
    User = _require.User,
    Project = _require.Project;

exports.seed = function (knex, Promise) {
  return knex(Project.tableName).del().then(function () {
    return User.findAll();
  }).then(function (users) {
    if (users.length <= 0) throw 'No users found';
    return users[0].id;
  }).then(function (userId) {
    return [{
      user_id: userId,
      name: 'Sample Project',
      description: 'This is just a sample project to create some data to look at.'
    }, {
      user_id: userId,
      name: 'Another Project',
      description: 'This is another project of sample data.',
      completed_at: knex.fn.now()
    }];
  }).then(function (newProjects) {
    return Promise.all(newProjects.map(function (project) {
      return Project.create(project);
    }));
  })["catch"](function (err) {
    return console.log('err: ', err);
  });
};
//# sourceMappingURL=002_project_seed.js.map