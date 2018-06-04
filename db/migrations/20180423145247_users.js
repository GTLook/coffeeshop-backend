const TABLE_NAME = 'users'

exports.up = function(knex, Promise) {
  return knex.schema.createTable(TABLE_NAME, function(table){
    table.increments()
    table.string('first_name').notNullable().defaultTo('')
    table.string('last_name').notNullable().defaultTo('')
    table.string('email').notNullable().defaultTo('')
    table.string('hashed_password').notNullable().defaultTo('')
    table.string('picture').defaultTo('http://www.placebear.com/50/50')
    table.timestamps(true,true)
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists(TABLE_NAME)
};
