const TABLE_NAME = 'product_option_extra'

exports.up = function(knex, Promise) {
  return knex.schema.createTable(TABLE_NAME, function(table){
    table.increments()
    table.string('extra_options').notNullable().defaultTo('')
    table.decimal('product_extra_price').notNullable().defaultTo(0)
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists(TABLE_NAME)
};
