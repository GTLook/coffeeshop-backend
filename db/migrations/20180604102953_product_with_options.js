const TABLE_NAME = 'product_with_options'

exports.up = function(knex, Promise) {
  return knex.schema.createTable(TABLE_NAME, function(table){
    table.increments()
    table.integer('product_id').notNullable().references('products.id')
    table.integer('drink_size').notNullable().references('product_option_size.id')
    table.integer('milk_type').references('product_option_milk.id')
    table.integer('extra_options').references('product_option_extra.id')
    table.integer('espresso_shots').defaultTo(0)
    table.integer('extra_espresso_shots').defaultTo(0)
    table.decimal('extra_espresso_shots_price').notNullable().defaultTo(0)
    table.timestamps(true,true)
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists(TABLE_NAME)
};
