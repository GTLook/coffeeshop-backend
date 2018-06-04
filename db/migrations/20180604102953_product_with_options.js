const TABLE_NAME = 'product_with_options'

exports.up = function(knex, Promise) {
  return knex.schema.createTable(TABLE_NAME, function(table){
    table.increments()
    table.integer('product_id').notNullable().references('products.id')
    table.integer('drink_size').notNullable().references('product_option_size.id')
    table.integer('milk_type').notNullable().references('product_option_milk.id')
    table.integer('extra_options').notNullable().references('product_option_extra.id')
    table.timestamps(true,true)
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists(TABLE_NAME)
};
