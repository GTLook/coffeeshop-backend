const TABLE_NAME = 'user_product_favorites'
//const db = require('../')
// const st = require('knex-postgis')(db)

exports.seed = function(knex, Promise) {
  return knex(TABLE_NAME).del()
    .then(() => {
      return knex(TABLE_NAME).insert([
        {id: 1, user_id: 1, shop_id: 1},
        {id: 2, user_id: 2, shop_id: 2},
        {id: 3, user_id: 1, shop_id: 1},
        {id: 4, user_id: 2, shop_id: 2},
        {id: 5, user_id: 2, shop_id: 1},
        {id: 6, user_id: 1, shop_id: 2},
      ])
    })
    .then(() => {
      return knex.raw(`SELECT setval('${TABLE_NAME}_id_seq', (SELECT MAX(id) FROM ${TABLE_NAME}));`)
    })
}
