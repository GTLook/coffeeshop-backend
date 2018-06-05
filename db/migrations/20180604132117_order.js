const TABLE_NAME = 'order'

exports.up = function(knex, Promise) {
  return knex.schema.createTable(TABLE_NAME, function(table){
    table.increments()
    table.integer('order_user_id').notNullable().references('users.id')
    table.integer('order_shop_id').notNullable().references('shops.id')
    table.boolean('is_fulfilled').notNullable().defaultTo(false)
    //table.string('pickup_time').notNullable().defaultTo('')
    table.time('pickup_time').notNullable()
    table.timestamps(true,true)
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists(TABLE_NAME)
};
