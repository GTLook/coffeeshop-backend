const TABLE_NAME = 'products'

exports.seed = function(knex, Promise) {
  return knex(TABLE_NAME).del()
    .then(() => {
      return knex(TABLE_NAME).insert([
        {id: 1, shop_id: 1, item_name: 'Doppio', item_price: 4.00, item_picture: 'http://www.placebear.com/150/150'},
        {id: 2, shop_id: 1, item_name: 'Caffè Americano', item_price: 4.00, item_picture: 'http://www.placebear.com/150/150'},
        {id: 3, shop_id: 1, item_name: 'Cappuccino', item_price: 5.00, item_picture: 'http://www.placebear.com/150/150'},
        {id: 4, shop_id: 1, item_name: 'Green Tea', item_price: 4.00, item_picture: 'http://www.placebear.com/150/150'},
        {id: 5, shop_id: 1, item_name: 'Black coffee', item_price: 4.00, item_picture: 'http://www.placebear.com/150/150'},
        {id: 6, shop_id: 2, item_name: 'Doppio', item_price: 4.00, item_picture: 'http://www.placebear.com/150/150'},
        {id: 7, shop_id: 2, item_name: 'Caffè Americano', item_price: 4.00, item_picture: 'http://www.placebear.com/150/150'},
        {id: 8, shop_id: 2, item_name: 'Cappuccino', item_price: 5.00, item_picture: 'http://www.placebear.com/150/150'},
        {id: 9, shop_id: 2, item_name: 'Green Tea', item_price: 4.00, item_picture: 'http://www.placebear.com/150/150'},
        {id: 10, shop_id: 2, item_name: 'Chia Tea', item_price: 4.00, item_picture: 'http://www.placebear.com/150/150'},
        {id: 11, shop_id: 2, item_name: 'Black coffee', item_price: 4.00, item_picture: 'http://www.placebear.com/150/150'},
        {id: 12, shop_id: 3, item_name: 'Doppio', item_price: 4.00, item_picture: 'http://www.placebear.com/150/150'},
        {id: 13, shop_id: 3, item_name: 'Caffè Americano', item_price: 4.00, item_picture: 'http://www.placebear.com/150/150'},
        {id: 14, shop_id: 3, item_name: 'Cappuccino', item_price: 5.00, item_picture: 'http://www.placebear.com/150/150'}
      ])
    })
    .then(() => {
      return knex.raw(`SELECT setval('${TABLE_NAME}_id_seq', (SELECT MAX(id) FROM ${TABLE_NAME}));`)
    })
}
