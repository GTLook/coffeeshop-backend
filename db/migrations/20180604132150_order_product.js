const TABLE_NAME = 'order_product'

exports.up = function(knex, Promise) {
  return knex.schema.createTable(TABLE_NAME, function(table){
    table.increments()
    table.integer('order_id').notNullable().references('order.id')
    table.integer('product_with_options_id').notNullable().references('product_with_options.id')
    // table.string('pickup_time').notNullable().defaultTo('')
    //table.time('pickup_time').notNullable()
    table.timestamps(true,true)
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists(TABLE_NAME)
};
