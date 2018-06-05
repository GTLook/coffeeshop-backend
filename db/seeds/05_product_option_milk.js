const TABLE_NAME = 'product_option_milk'

exports.seed = function(knex, Promise) {
  return knex(TABLE_NAME).del()
    .then(() => {
      return knex(TABLE_NAME).insert([
        {id: 1, product_milk: "Whole Milk", product_milk_price: 0},
        {id: 2, product_milk: "Almond Milk", product_milk_price: 0.25},
        {id: 3, product_milk: "Oatmeal Milk", product_milk_price: 0.25},
        {id: 4, product_milk: "Soy Milk", product_milk_price: 0}
      ])
    })
    .then(() => {
      return knex.raw(`SELECT setval('${TABLE_NAME}_id_seq', (SELECT MAX(id) FROM ${TABLE_NAME}));`)
    })
}
