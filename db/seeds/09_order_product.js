const TABLE_NAME = 'order_product'

exports.seed = function(knex, Promise) {
  return knex(TABLE_NAME).del()
    .then(() => {
      return knex(TABLE_NAME).insert([
        {id: 1, order_id: 1, product_with_options_id: 1},
        {id: 2, order_id: 1, product_with_options_id: 2},
        {id: 3, order_id: 1, product_with_options_id: 2},
        {id: 4, order_id: 1, product_with_options_id: 2},
        {id: 5, order_id: 1, product_with_options_id: 2},
      ])
    })
    .then(() => {
      return knex.raw(`SELECT setval('${TABLE_NAME}_id_seq', (SELECT MAX(id) FROM ${TABLE_NAME}));`)
    })
}
