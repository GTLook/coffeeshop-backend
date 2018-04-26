const messageModel = require('../models/messages')

//////////////////////////////////////////////////////////////////////////////
// Basic CRUD Methods
//////////////////////////////////////////////////////////////////////////////

function create(req, res, next){
  if(!req.body.message){
    return next({ status: 400, message: 'Message can not be blank'})
  }
  if(!req.body.location){
    return next({ status: 400, message: 'Location can not be blank'})
  }
  console.log('created at location:', req.body.location);
  messageModel.create(req.body.message, req.body.location, req.claim.id)
  .then(function(data){
    return res.status(201).send({ data })
  })
  .catch(next)
}


function distance(req, res, next){
  console.log(req.params)
  console.log(req.query);
  if(!parseFloat(req.params.distance)){
    return next({ status: 400, message: 'Distance must be a number'})
  }
  console.log(req.query.location);

  messageModel.distance(parseFloat(req.params.distance),req.claim.id, req.query.location, req.query.onlyFriends)
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
