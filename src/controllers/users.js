const userModel = require('../models/users')

//////////////////////////////////////////////////////////////////////////////
// Basic CRUD Methods
//////////////////////////////////////////////////////////////////////////////

function create(req, res, next){
  if(!req.body.email){
    return next({ status: 400, message: 'Bad email'})
  }
  if(!req.body.password){
    return next({ status: 400, message: 'Bad password'})
  }
  if(!req.body.first_name){
    return next({ status: 400, message: 'Include First Name'})
  }
  if(!req.body.last_name){
    return next({ status: 400, message: 'Include Last Name'})
  }

  userModel.create(req.body)
  .then(function(data){
    return res.status(201).send({ data })
  })
  .catch(next)
}

//////////////////////////////////////////////////////////////////////////////
// Quality of Life functions
//////////////////////////////////////////////////////////////////////////////

module.exports = {
  create
}
