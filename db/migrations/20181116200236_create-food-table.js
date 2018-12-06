exports.up = function (knex, Promise) {

  return Promise.all([

    knex.schema.createTable('food', function (table) {
      table.increments('id').primary();
      table.string('name');
      table.string('type');
      table.string('city');
      table.float('rating');
      table.string('price');
      table.integer('visitCount').defaultTo(1);
      table.boolean('isClosed').defaultTo(false);
      table.timestamps(true, true);
      table.unique('name');
    }),

  ])
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('food')
  ])
};