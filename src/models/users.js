const db = require('../../db/knex')
const bcrypt = require('bcrypt-as-promised')

//////////////////////////////////////////////////////////////////////////////
// Basic CRUD Methods
//////////////////////////////////////////////////////////////////////////////

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

//////////////////////////////////////////////////////////////////////////////
// Create a user
//
// 1. Check to see if user already exists
//   a. if so, return a 400 with appropriate error message
// 2. Hash password
// 3. Insert record into database
// 4. strip hashed password away from object
// 5. "return/continue" promise
//////////////////////////////////////////////////////////////////////////////

function create({email, password, first_name, last_name, picture}){
  // check to see of user already exists
  return getOneByEmail(email)
  .then(function(data){
    // if user already exists, return 400
    if(data) throw { status: 400, message:'User already exists'}

    // hash password
    return bcrypt.hash(password, 10)
  })
  .then(function(hashedPassword){

    picture = picture ? picture : 'http://www.placecage.com/50/50'

    // 3. Insert record into database
    return (
      db('users')
      .insert({ email, hashed_password: hashedPassword, first_name, last_name, picture})
      .returning('*')
    )
  })
  .then(function([ data ]){
    // 4. strip hashed password away from object
    delete data.password
    // 5. "return/continue" promise
    return data
  })
}

module.exports = {
  getOneByEmail,
  getOneById,
  create,
}
