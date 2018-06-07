const TABLE_NAME = 'users'

exports.seed = function(knex, Promise) {
  return knex(TABLE_NAME).del()
    .then(() => {
      return knex(TABLE_NAME).insert([
        {id: 1, first_name: 'Dan', last_name: 'Dog', email: 'dandog@gmail.com', hashed_password: '$2a$10$le4wxT7h3lM/Nt/P0ioTkOQ7FlIInpPK5G3iRK3YswmSZT2ihhcpm', picture:'http://www.placecage.com/50/50' },
        {id: 2, first_name: 'Tengo', last_name: 'Dog', email: 'tengo@gmail.com', hashed_password: '$2a$10$uGg.CIM3Mr11xbVuGGLgHeWpmR1tegLeN0jnZy/6STBP2No1nqin2', picture:'http://www.placecage.com/50/50'},
        {id: 3, first_name: 'Gavin', last_name: 'Look', email: 'GTLook@gmail.com', hashed_password: '$2a$10$le4wxT7h3lM/Nt/P0ioTkOQ7FlIInpPK5G3iRK3YswmSZT2ihhcpm', picture:'http://www.placebear.com/50/50' },
        {id: 4, first_name: 'Mark', last_name: 'Pavloski', email: 'Mark@gmail.com', hashed_password: '$2a$10$uGg.CIM3Mr11xbVuGGLgHeWpmR1tegLeN0jnZy/6STBP2No1nqin2', picture:'http://www.placekitten.com/50/50' }

      ])
    })
    .then(() => {
      return knex.raw(`SELECT setval('${TABLE_NAME}_id_seq', (SELECT MAX(id) FROM ${TABLE_NAME}));`)
    })
}
