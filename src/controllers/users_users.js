const friendshipModel = require('../models/users_users')

//////////////////////////////////////////////////////////////////////////////
// Basic CRUD Methods
//////////////////////////////////////////////////////////////////////////////

function create(req, res, next){
  if(!req.body.friendsId){
    return next({ status: 400, message: 'Friends id cannot be blank'})
  }
  friendshipModel.create(req.body.friendsId, req.claim.id)
  .then(function(data){
    return res.status(201).send({ data })
  })
  .catch(next)
}

function remove(req, res, next){
  if(!req.body.friendsId){
    return next({ status: 400, message: 'Friends id cannot be blank'})
  }
  friendshipModel.remove(req.body.friendsId, req.claim.id)
  .then(function(data){
    return res.status(201).send({ data })
  })
  .catch(next)
}


function get(req, res, next){
  friendshipModel.get(req.claim.id)
  .then(function(data){
    return res.status(201).send({ data })
  })
  .catch(next)
}

//////////////////////////////////////////////////////////////////////////////
// Quality of Life functions
//////////////////////////////////////////////////////////////////////////////

module.exports = {
  create,
  remove,
  get
}
