const TABLE_NAME = 'order_ledger'

exports.up = function(knex, Promise) {
  return knex.schema.createTable(TABLE_NAME, function(table){
    table.increments()
    table.string('order_shortid').notNullable()
    table.integer('order_user_id').notNullable().references('users.id')
    table.integer('order_shop_id').notNullable().references('shops.id')
    table.boolean('is_fulfilled').defaultTo(false)
    table.boolean('is_canceled').defaultTo(false)
    table.timestamp('pickup_time').notNullable()
    table.timestamps(true,true)
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists(TABLE_NAME)
};
