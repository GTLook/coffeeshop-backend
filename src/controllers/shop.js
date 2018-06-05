const dataModel = require('../models/shop')

//////////////////////////////////////////////////////////////////////////////
// Basic CRUD Methods
//////////////////////////////////////////////////////////////////////////////

const getAll = (req, res, next) => {
  dataModel.getAll()
  .then((data) => res.status(200).json({ data }))
  .catch(next)
}

const getOne = (req, res, next) => {
  dataModel.getOne(req.params.id, req.params.reviewId)
  .then((data) => res.status(200).json({ data }))
  .catch(next)
}

const create = (req, res, next) => {
  if(!req.body.title) return next({ status: 400, message:  'Error: Specify Title'})
  if(!req.body.text) return next({ status: 400, message: 'Error: Specify Text'})
  if(!req.body.rating) return next({ status: 400, message: 'Error: Specify Rating'})

  dataModel.create(req.params.id, req.claim.id, req.body)

  .then((data) => res.status(201).json({ data }))
  .catch(next)
}

const modify = (req, res, next) => {
  dataModel.getOne(req.params.id, req.params.reviewId)
  .then(review => {
    if(req.claim.id !== review[0]['user_id']) {
      return next({ status: 401, message:  'Unauthorized'})
    }
    dataModel.modify(req.params.id, req.params.reviewId, req.claim.id, req.body)
    .then((data) => res.status(200).json({ data }))
    .catch(next)
  })
  .catch(next)
}

const remove = (req, res, next) => {
  dataModel.getOne(req.params.id, req.params.reviewId)
  .then(review => {
    if(req.claim.id !== review[0]['user_id']) {
      return next({ status: 401, message:  'Unauthorized'})
    }
    dataModel.remove(req.params.reviewId)
    .then((data) => res.status(200).json({ data }))
    .catch(next)
  })
  .catch(next)
}

module.exports = { getAll, getOne, create, modify, remove }
