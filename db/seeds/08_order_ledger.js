const TABLE_NAME = 'order_ledger'

exports.seed = function(knex, Promise) {
  return knex(TABLE_NAME).del()
    .then(() => {
      return knex(TABLE_NAME).insert([
        {id: 1, order_shortid: 'AHND123', order_user_id: 1, order_shop_id: 1, is_fulfilled: true, is_canceled: false, pickup_time: '2018-06-07 21:19:49.927002-07'},
        {id: 2, order_shortid: 'AHND124', order_user_id: 2, order_shop_id: 1, is_fulfilled: false, is_canceled: false, pickup_time: '2018-06-08 12:00:49.927002-07'},
        // {id: 3, order_shortid: 'AHND125', order_user_id: 2, order_shop_id: 1, is_fulfilled: false, is_canceled: false, pickup_time: '2018-05-05 06:00:00'},
        // {id: 4, order_shortid: 'AHND126', order_user_id: 1, order_shop_id: 1, is_fulfilled: false, is_canceled: false, pickup_time: '2018-05-05 06:00:00'},
        // {id: 5, order_shortid: 'AHND127', order_user_id: 1, order_shop_id: 1, is_fulfilled: false, is_canceled: false, pickup_time: '2018-05-05 06:00:00'},
      ])
    })
    .then(() => {
      return knex.raw(`SELECT setval('${TABLE_NAME}_id_seq', (SELECT MAX(id) FROM ${TABLE_NAME}));`)
    })
  }
