const TABLE_NAME = 'product_with_options'

exports.seed = function(knex, Promise) {
  return knex(TABLE_NAME).del()
    .then(() => {
      return knex(TABLE_NAME).insert([
        {id: 1, product_id: 1, drink_size: 2, milk_type: 1, extra_options: null, espresso_shots: 2, extra_espresso_shots:0, extra_espresso_shots_price:.75},
        {id: 2, product_id: 2, drink_size: 2, milk_type: 2, extra_options: 1, espresso_shots: 2, extra_espresso_shots:2, extra_espresso_shots_price:.75},
        {id: 3, product_id: 3, drink_size: 1, milk_type: 2, extra_options: 1, espresso_shots: 2, extra_espresso_shots:0, extra_espresso_shots_price:.75},
        {id: 4, product_id: 4, drink_size: 2, milk_type: 1, extra_options: null, espresso_shots: 0, extra_espresso_shots:0, extra_espresso_shots_price:.75},
        {id: 5, product_id: 5, drink_size: 1, milk_type: 3, extra_options: 1, espresso_shots: 2, extra_espresso_shots:0, extra_espresso_shots_price:.75},
        {id: 6, product_id: 6, drink_size: 3, milk_type: 4, extra_options: 1, espresso_shots: 2, extra_espresso_shots:0, extra_espresso_shots_price:.75},
      ])
    })
    .then(() => {
      return knex.raw(`SELECT setval('${TABLE_NAME}_id_seq', (SELECT MAX(id) FROM ${TABLE_NAME}));`)
    })
}
