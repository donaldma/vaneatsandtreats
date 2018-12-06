exports.up = function (knex, Promise) {

  return Promise.all([

    knex.schema.createTable('user', function (table) {
      table.increments('id').primary();
      table.string('username');
      table.string('password');
      table.boolean('isAdmin').default(false);
      table.timestamps(true, true);
      table.unique('username');
    }),

  ])
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('user')
  ])
};