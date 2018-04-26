const db = require('../../db')
const bcrypt = require('bcrypt-as-promised')
const userModel = require('./users')





function create(friends_id,users_id){
  if (parseInt(friends_id) === parseInt(users_id)) throw { status: 400, message:'Cannot friend yourself'}
  return (
    db('users_users')
    .where({users_id , friends_id })
    .first()
  )
  .then(function(friendship){
    if(friendship) return friendship
    return (
      db('users_users')
      .insert({ users_id, friends_id })
      .returning('*')
    )
  })
}



function remove(friends_id,users_id){
  return (
    db('users_users')
    .where({users_id , friends_id })
    .first()
    .del()
    .returning('*')
  )
}


function get(users_id){
  return (
    db('users_users')
    .where({users_id})
    .returning('*')
  )
}

module.exports = {
  create,
  remove,
  get
}
