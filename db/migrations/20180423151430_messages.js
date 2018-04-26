const TABLE_NAME = 'messages'


exports.up = function(knex, Promise) {
  return knex.schema
    .createTable(TABLE_NAME, function(table){
      table.increments()
      table.integer('users_id').notNullable().references('users.id')
      table.specificType('location', 'geography(POINT)').notNullable()
      table.text('message').notNullable()
      table.timestamps(true,true)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists(TABLE_NAME)
};
