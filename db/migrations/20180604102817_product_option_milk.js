const TABLE_NAME = 'product_option_milk'

exports.up = function(knex, Promise) {
  return knex.schema.createTable(TABLE_NAME, function(table){
    table.increments()
    table.string('product_milk').notNullable().defaultTo('2% beefmilk')
    table.decimal('product_milk_price').notNullable().defaultTo(0)
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists(TABLE_NAME)
};
