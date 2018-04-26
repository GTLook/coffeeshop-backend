exports.seed = function(knex, Promise) {

  return knex('users_users').del()
  .then(function () {
    return knex('messages').del()
  })
  .then(function () {
    return knex('users').del()
  })
}
