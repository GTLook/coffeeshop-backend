const TABLE_NAME = 'product_option_extra'

exports.seed = function(knex, Promise) {
  return knex(TABLE_NAME).del()
    .then(() => {
      return knex(TABLE_NAME).insert([
        {id: 1, extra_options: "Fancy Shit", product_extra_price: 1.5},
      ])
    })
    .then(() => {
      return knex.raw(`SELECT setval('${TABLE_NAME}_id_seq', (SELECT MAX(id) FROM ${TABLE_NAME}));`)
    })
}
