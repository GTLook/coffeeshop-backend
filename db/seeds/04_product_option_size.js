const TABLE_NAME = 'product_option_size'

exports.seed = function(knex, Promise) {
  return knex(TABLE_NAME).del()
    .then(() => {
      return knex(TABLE_NAME).insert([
        {id: 1, product_size: '8 oz', product_size_price: 0},
        {id: 2, product_size: '12 oz', product_size_price: .5},
        {id: 3, product_size: '16 oz', product_size_price: 1},
        {id: 4, product_size: 'Mega Ultra Grande', product_size_price: 10}
      ])
    })
    .then(() => {
      return knex.raw(`SELECT setval('${TABLE_NAME}_id_seq', (SELECT MAX(id) FROM ${TABLE_NAME}));`)
    })
}
