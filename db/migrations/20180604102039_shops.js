const TABLE_NAME = 'shops'

exports.up = function(knex, Promise) {
  return knex.schema.createTable(TABLE_NAME, function(table){
    table.increments()
    table.integer('owner_id').notNullable().references('users.id')
    table.string('shop_name').notNullable().defaultTo('')
    table.string('shop_location_address').notNullable().defaultTo('')
    table.string('shop_location_placeID').notNullable().defaultTo('')
    table.string('shop_time_open').notNullable().defaultTo('')
    table.string('shop_time_close').notNullable().defaultTo('')
    // table.dateTime('shop_time_open').notNullable()
    // table.dateTime('shop_time_close').notNullable()
    table.string('picture').defaultTo('http://www.placekitten.com/100/100')
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists(TABLE_NAME)
};
