const TABLE_NAME = 'messages'
const db = require('../')
const st = require('knex-postgis')(db)

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex(TABLE_NAME).del()
    .then(function () {
      // Inserts seed entries
      return knex(TABLE_NAME).insert([
        {id: 1, users_id: 1, location: st.geography(st.geomFromText('Point(47.620361 -122.349947)', 4326)), message: 'space needle'},
        {id: 2, users_id: 1, location: st.geography(st.geomFromText('Point(47.592506 -122.334418)', 4326)), message: 'safeco field'},
        {id: 3, users_id: 2, location: st.geography(st.geomFromText('Point(47.608089 -122.341192)', 4326)), message: 'pike place'},
        {id: 4, users_id: 2, location: st.geography(st.geomFromText('Point(47.650852 -122.347812)', 4326)), message: 'fremont troll'}
        // {id: 2, users_id: 1, location: '47.614445, -122.322622', message: 'world'},
        // {id: 3, users_id: 2, location: '47.614445, -122.322622', message: 'woof'},
        // {id: 4, users_id: 2, location: '47.614445, -122.322622', message: 'woof woof'}47.620361, -122.349947
      ])


    })
    .then(() => {
      // reset sequence
      return knex.raw(`SELECT setval('${TABLE_NAME}_id_seq', (SELECT MAX(id) FROM ${TABLE_NAME}));`)
    })
}
