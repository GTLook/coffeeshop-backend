const TABLE_NAME = 'user_product_favorites'

exports.up = function(knex, Promise) {
  return knex.schema.createTable(TABLE_NAME, function(table){
    table.increments()
    table.integer('user_id').notNullable().references('users.id')
    table.integer('shop_id').notNullable().references('shops.id')
    table.integer('product_with_options_id').notNullable().references('product_with_options.id')
    // table.time('pickup_time')
    table.timestamps(true,true)
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists(TABLE_NAME)
};
