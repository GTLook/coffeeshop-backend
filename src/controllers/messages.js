const messageModel = require('../models/messages')

//////////////////////////////////////////////////////////////////////////////
// Basic CRUD Methods
//////////////////////////////////////////////////////////////////////////////

function create(req, res, next){
  if(!req.body.message){
    return next({ status: 400, message: 'Message can not be blank'})
  }
  messageModel.create(req.body.message, req.claim.id)
  .then(function(data){
    return res.status(201).send({ data })
  })
  .catch(next)
}


function distance(req, res, next){
  console.log(req.params)
  if(!parseFloat(req.params.distance)){
    return next({ status: 400, message: 'Distance must be a number'})
  }
  messageModel.distance(parseFloat(req.params.distance),req.claim.id, req.query.onlyFriends)
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
  distance
}
