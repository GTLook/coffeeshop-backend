const TABLE_NAME = 'order'

exports.seed = function(knex, Promise) {
  return knex(TABLE_NAME).del()
    .then(() => {
      return knex(TABLE_NAME).insert([
        {id: 1, order_user_id: 1, order_shop_id: 2, is_fulfilled: true, pickup_time: '00:06:00'},
        {id: 2, order_user_id: 2, order_shop_id: 3, is_fulfilled: false, pickup_time: '00:08:00'},
        {id: 3, order_user_id: 2, order_shop_id: 4, is_fulfilled: false, pickup_time: '00:09:00'},
        {id: 4, order_user_id: 3, order_shop_id: 2, is_fulfilled: false, pickup_time: '00:07:00'},
        {id: 5, order_user_id: 4, order_shop_id: 1, is_fulfilled: false, pickup_time: '00:05:00'}
      ])
    })
    .then(() => {
      return knex.raw(`SELECT setval('${TABLE_NAME}_id_seq', (SELECT MAX(id) FROM ${TABLE_NAME}));`)
    })
}
