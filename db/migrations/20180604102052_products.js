const TABLE_NAME = 'products'

exports.up = function(knex, Promise) {
  return knex.schema.createTable(TABLE_NAME, function(table){
    table.increments()
    table.integer('shop_id').notNullable().references('shops.id')
    table.string('item_name').notNullable()
    table.decimal('item_price').notNullable()
    table.string('item_picture').defaultTo('http://www.placebear.com/50/50')
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists(TABLE_NAME)
};
