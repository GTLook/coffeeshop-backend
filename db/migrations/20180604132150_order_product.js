const TABLE_NAME = 'order_product'

exports.up = function(knex, Promise) {
  return knex.schema.createTable(TABLE_NAME, function(table){
    table.increments()
    table.integer('order_id').notNullable().references('order_ledger.id')
    table.integer('product_with_options_id').notNullable().references('product_with_options.id')
    table.integer('product_option_size').notNullable().references('product_option_size.id')
    table.integer('product_option_milk').notNullable().references('product_option_milk.id')
    table.integer('product_option_extra').notNullable().references('product_option_extra.id')
    table.integer('extra_espresso_shots').notNullable().defaultTo(0)
    table.timestamps(true,true)
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists(TABLE_NAME)
};
