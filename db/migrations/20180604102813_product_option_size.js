const TABLE_NAME = 'product_option_size'

exports.up = function(knex, Promise) {
  return knex.schema.createTable(TABLE_NAME, function(table){
    table.increments()
    table.string('product_size').notNullable().defaultTo('8 oz')
    table.decimal('product_size_price').notNullable().defaultTo(0)
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists(TABLE_NAME)
};
