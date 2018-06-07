const TABLE_NAME = 'shops'
//const db = require('../')
// const st = require('knex-postgis')(db)

exports.seed = function(knex, Promise) {
  return knex(TABLE_NAME).del()
    .then(() => {
      return knex(TABLE_NAME).insert([
        {id: 1, owner_id: 1, shop_name: 'Zeitgeist Coffee', shop_location_address:'171 S Jackson St, Seattle, WA WA 98101, USA', shop_location_placeID:'ChIJM_73yqRqkFQRgLc2-YKhXr4', shop_time_open: '5:00 AM', shop_time_close: '4:00 PM', picture:'https://lh5.googleusercontent.com/p/AF1QipNyoWUS2AaW6BV49fD0JvuBOGHf3wPjn_w4jzmO=w408-h306-k-no' },
        {id: 2, owner_id: 2, shop_name: 'Ghost Alley Espresso', shop_location_address:'1499 Post Alley, Seattle, WA 98101, USA', shop_location_placeID:'CChIJPQG7WLJqkFQRUXVHLnb3Lro', shop_time_open: '5:30 AM', shop_time_close: '3:00 PM', picture:'https://lh5.googleusercontent.com/p/AF1QipO3zVzYmjcVlvEy4daPQB3m5KVq5zt0N_TTsMqe=w408-h304-k-no'},
        {id: 3, owner_id: 3, shop_name: 'Cherry Street Public House', shop_location_address:'171 S Jackson St, Seattle, WA WA 98101, USA', shop_location_placeID:'ChIJM_73yqRqkFQRgLc2-YKhXr4', shop_time_open: '5:00 AM', shop_time_close: '4:00 PM', picture:'http://l7.alamy.com/zooms/2f198e96c54a4549a43af7dec412575c/seattle-usa-cherry-street-coffee-house-in-pioneer-square-d492r7.jpg' },
        {id: 4, owner_id: 4, shop_name: 'Caffe Umbria', shop_location_address:' 3531, 1201 Westlake Ave N, Seattle, WA 98109', shop_location_placeID:'CChIJPQG7WLJqkFQRUXVHLnb3Lro', shop_time_open: '5:00 AM', shop_time_close: '2:00 PM', picture:'https://i.pinimg.com/736x/41/b4/ff/41b4ff07b2bc84612147646eb8477e4c--coffee-shop-design-coffeeshops.jpg' }
      ])
    })
    .then(() => {
      return knex.raw(`SELECT setval('${TABLE_NAME}_id_seq', (SELECT MAX(id) FROM ${TABLE_NAME}));`)
    })
}
