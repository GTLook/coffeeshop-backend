const db = require('../../db/knex')
const bcrypt = require('bcrypt-as-promised')

// Basic CRUD Methods

function getOneByEmail(email){
  return (
    db('users')
    .where({ email })
    .first()
  )
}

function getOneById(id){
  return (
    db('users')
    .where({ id })
    .first()
  )
}

function create({email, password, first_name, last_name, picture}){
  return getOneByEmail(email)
  .then(function(data){
    if(data) throw { status: 400, message:'User already exists'}
    return bcrypt.hash(password, 10)
  })
  .then(function(hashedPassword){
    picture = picture ? picture : 'http://www.placecage.com/50/50'
    return (
      db('users')
      .insert({ email, hashed_password: hashedPassword, first_name, last_name, picture})
      .returning('*')
    )
  })
  .then(function([ data ]){
    delete data.password
    return data
  })
}

module.exports = {
  getOneByEmail,
  getOneById,
  create,
}
