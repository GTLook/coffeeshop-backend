const moment = require('moment')

const TABLE_NAME = 'order'

exports.seed = function(knex, Promise) {
  return knex(TABLE_NAME).del()
    // .then(() => {
    //   return knex(TABLE_NAME).insert([
    //     {id: 1, order_shortid: 'AHND123', order_user_id: 1, order_shop_id: 2},
    //     // {id: 2, order_shortid: 'AHND124', order_user_id: 2, order_shop_id: 3, is_fulfilled: false, is_canceled: false, pickup_time: '2018-05-05 06:00:00'},
    //     // {id: 3, order_shortid: 'AHND125', order_user_id: 2, order_shop_id: 3, is_fulfilled: false, is_canceled: false, pickup_time: '2018-05-05 06:00:00'},
    //     // {id: 4, order_shortid: 'AHND126', order_user_id: 1, order_shop_id: 2, is_fulfilled: false, is_canceled: false, pickup_time: '2018-05-05 06:00:00'},
    //     // {id: 5, order_shortid: 'AHND127', order_user_id: 1, order_shop_id: 1, is_fulfilled: false, is_canceled: false, pickup_time: '2018-05-05 06:00:00'},
    //   ])
    // })
    // .then(() => {
    //   return knex.raw(`SELECT setval('${TABLE_NAME}_id_seq', (SELECT MAX(id) FROM ${TABLE_NAME}));`)
    // })
  }
  //
  // table.increments()
  // table.string('order_shortid').notNullable()
  // table.integer('order_user_id').notNullable().references('users.id')
  // table.integer('order_shop_id').notNullable().references('shops.id')
  // table.boolean('is_fulfilled').notNullable().defaultTo(false)
  // table.boolean('is_canceled').notNullable().defaultTo(false)
  // //table.string('pickup_time').notNullable().defaultTo('')
  // //table.timestamp('pickup_time').notNullable()
  // table.timestamps(true,true)
