const TABLE_NAME = 'order_product'

exports.seed = function(knex, Promise) {
  return knex(TABLE_NAME).del()
    .then(() => {
      return knex(TABLE_NAME).insert([
        {id: 1, order_id: 1, product_with_options_id: 1, product_option_size: 1, product_option_milk: 1, product_option_extra: 1, extra_espresso_shots: 0 },
        {id: 2, order_id: 1, product_with_options_id: 2, product_option_size: 2, product_option_milk: 2, product_option_extra: 1, extra_espresso_shots: 2 },
        {id: 3, order_id: 1, product_with_options_id: 3, product_option_size: 1, product_option_milk: 1, product_option_extra: 1, extra_espresso_shots: 0 },
        {id: 4, order_id: 1, product_with_options_id: 4, product_option_size: 3, product_option_milk: 2, product_option_extra: 1, extra_espresso_shots: 0 },
        {id: 5, order_id: 2, product_with_options_id: 1, product_option_size: 1, product_option_milk: 1, product_option_extra: 1, extra_espresso_shots: 0 },
        {id: 6, order_id: 2, product_with_options_id: 2, product_option_size: 2, product_option_milk: 2, product_option_extra: 1, extra_espresso_shots: 2 },
        // {id: 7, order_id: 3, product_with_options_id: 1, product_option_size: 2, product_option_milk: 2, product_option_extra: 1, extra_espresso_shots: 0 },
        // {id: 8, order_id: 4, product_with_options_id: 2, product_option_size: 2, product_option_milk: 2, product_option_extra: 1, extra_espresso_shots: 2 },
        // {id: 9, order_id: 5, product_with_options_id: 3, product_option_size: 2, product_option_milk: 2, product_option_extra: 1, extra_espresso_shots: 0 },
      ])
    })
    .then(() => {
      return knex.raw(`SELECT setval('${TABLE_NAME}_id_seq', (SELECT MAX(id) FROM ${TABLE_NAME}));`)
    })
}
