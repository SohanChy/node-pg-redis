"use strict";

exports.up = function (knex) {
  return knex.schema.createTable('projects', function (t) {
    t.increments('id').primary().unsigned();
    t.integer('user_id').references('users.id').unsigned().index().onDelete('CASCADE');
    t.string('name');
    t.text('description');
    t.timestamp('completed_at');
    t.timestamp('created_at').defaultTo(knex.fn.now());
    t.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('projects');
};
//# sourceMappingURL=20180326105452_create_projects.js.map