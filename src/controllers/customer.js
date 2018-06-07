const dataModel = require('../models/customer')

//////////////////////////////////////////////////////////////////////////////
// Get Shop Info
//////////////////////////////////////////////////////////////////////////////

const getAllShops = (req, res, next) => {
  dataModel.getAllShops()
  .then((data) => res.status(200).json({ data }))
  .catch(next)
}

//////////////////////////////////////////////////////////////////////////////
// Get All Shops & Products
//////////////////////////////////////////////////////////////////////////////

const getAllProducts = (req, res, next) => {
  dataModel.getAllProducts()
  .then((data) => res.status(200).json({ data }))
  .catch(next)
}


//////////////////////////////////////////////////////////////////////////////
// Get All Options
//////////////////////////////////////////////////////////////////////////////

const getAllOptions = (req, res, next) => {
  dataModel.getAllOptions()
  .then((data) => res.status(200).json({ data }))
  .catch(next)
}

//////////////////////////////////////////////////////////////////////////////
// CRUD for users by UserId
//////////////////////////////////////////////////////////////////////////////

const getAllUserOrders = (req, res, next) => {
    if(!req.claim.id) return next({ status: 401, message: 'Unauthorized'})
    dataModel.getAllUserOrders(req.claim.id)
    .then((data) => res.status(200).json({ data }))
    .catch(next)
}

const createUserOrders = (req, res, next) => {
  if(!req.claim.id) return next({ status: 401, message: 'Unauthorized'})
  dataModel.createUserOrders(req.claim.id, req.body)
  .then((data) => res.status(200).json({ data }))
  .catch(next)
}


const modifyUserOrders = (req, res, next) => {
  dataModel.authGetOne(req.params.userId)
  .then(review => {
    if(req.claim.id !== review[0]['user_id']) return next({ status: 401, message: 'Unauthorized'})
    return dataModel.modifyUserOrders(req.params.userId, req.params.orderId, req.claim.id, req.body)
  })
  .then((data) => res.status(200).json({ data }))
  .catch(next)
}

const removeUserOrder = (req, res, next) => {
  dataModel.authGetOne(req.params.userId, req.params.reviewId)
  .then(review => {
    if(req.claim.id !== review[0]['user_id']) return next({ status: 401, message:  'Unauthorized'})
    return dataModel.removeUserOrder(req.params.orderId)
  })
  .then((data) => res.status(200).json({ data }))
  .catch(next)
}

const getAllUserFavorites = (req, res, next) => {
  dataModel.authGetOne(req.params.userId)
  .then(review => {
    if(req.claim.id !== review[0]['user_id']) return next({ status: 401, message: 'Unauthorized'})
    if(!req.params.userId) return next({ status: 400, message: 'Error: Specify userId'})
    return dataModel.getAllUserOrders(req.params.userId)
  })
  .then((data) => res.status(200).json({ data }))
  .catch(next)
}

module.exports = { getAllShops, getAllProducts, getAllUserOrders, createUserOrders, modifyUserOrders, removeUserOrder, getAllUserFavorites, getAllOptions }
