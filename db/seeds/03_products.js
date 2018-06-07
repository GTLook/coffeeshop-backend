const TABLE_NAME = 'products'

exports.seed = function(knex, Promise) {
  return knex(TABLE_NAME).del()
    .then(() => {
      return knex(TABLE_NAME).insert([
        {id: 1, shop_id: 1, item_name: 'Doppio', item_price: 3.50, item_picture: 'https://www.homegrounds.co/wp-content/uploads/2018/01/americano.jpg'},
        {id: 2, shop_id: 1, item_name: 'Caffè Americano', item_price: 3.25, item_picture: 'https://globalassets.starbucks.com/assets/1e021d70f2a744cdb7585ad5976f9816.jpg'},
        {id: 3, shop_id: 1, item_name: 'Cappuccino', item_price: 4.00, item_picture: 'https://northernheckler.files.wordpress.com/2010/09/coffee.jpg'},
        {id: 4, shop_id: 1, item_name: 'Green Tea', item_price: 3.00, item_picture: 'https://www.healthline.com/hlcmsresource/images/AN_images/AN79-Green_tea_on_wood-732x549-Thumb_0.jpg'},
        {id: 5, shop_id: 1, item_name: 'Black coffee', item_price: 2.00, item_picture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnfOqWx9Q4_aR1tHofY2F2HGpeH-w6nV4BltaBBO7F0l4iNf2GrQ'},
        {id: 6, shop_id: 2, item_name: 'Doppio', item_price: 4.00, item_picture: 'http://seabirdstruck.com/wp-content/uploads/2018/04/how-to-make-an-americano-coffee-1.jpg'},
        {id: 7, shop_id: 2, item_name: 'Caffè Americano', item_price: 4.00, item_picture: 'https://globalassets.starbucks.com/assets/1e021d70f2a744cdb7585ad5976f9816.jpg'},
        {id: 8, shop_id: 2, item_name: 'Cappuccino', item_price: 4.75, item_picture: 'https://northernheckler.files.wordpress.com/2010/09/coffee.jpg'},
        {id: 9, shop_id: 2, item_name: 'Green Tea', item_price: 4.00, item_picture: 'https://www.healthline.com/hlcmsresource/images/AN_images/AN79-Green_tea_on_wood-732x549-Thumb_0.jpg'},
        {id: 10, shop_id: 2, item_name: 'Chia Tea', item_price: 4.00, item_picture: 'https://www.organicfacts.net/wp-content/uploads/2013/07/tea2.jpg'},
        {id: 11, shop_id: 2, item_name: 'Black coffee', item_price: 2.00, item_picture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnfOqWx9Q4_aR1tHofY2F2HGpeH-w6nV4BltaBBO7F0l4iNf2GrQ'},
      ])
    })
    .then(() => {
      return knex.raw(`SELECT setval('${TABLE_NAME}_id_seq', (SELECT MAX(id) FROM ${TABLE_NAME}));`)
    })
}
