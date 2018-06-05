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
// Get Shop products by shop Id
//////////////////////////////////////////////////////////////////////////////

const getAllProducts = (req, res, next) => {
  if(!req.params.shopId) return next({ status: 400, message: 'Error: Specify ShopId for product list'})
  dataModel.getAllProducts(req.params.shopId)
  .then((data) => res.status(200).json({ data }))
  .catch(next)
}

//////////////////////////////////////////////////////////////////////////////
// CRUD for users by UserId
//////////////////////////////////////////////////////////////////////////////

const getAllUserOrders = (req, res, next) => {
  dataModel.authGetOne(req.params.userId)
  .then(review => {
    if(!req.params.userId) return next({ status: 400, message: 'Error: Specify userId'})
    if(req.claim.id !== review[0]['user_id']) return next({ status: 401, message: 'Unauthorized'})
    dataModel.getAllUserOrders(req.params.userId)
    .then((data) => res.status(200).json({ data }))
    .catch(next)
  })
  .catch(next)
}

const createUserOrders = (req, res, next) => {
  dataModel.authGetOne(req.params.userId)
  .then(review => {
    if(!req.params.userId) return next({ status: 400, message: 'Error: Specify userId'})
    if(req.claim.id !== review[0]['user_id']) return next({ status: 401, message: 'Unauthorized'})
    dataModel.createUserOrders(req.params.userId, req.claim.id, req.body)
      .then((data) => res.status(200).json({ data }))
      .catch(next)
      })
    .catch(next)
}

const modifyUserOrders = (req, res, next) => {
  dataModel.authGetOne(req.params.userId)
  .then(review => {
    if(req.claim.id !== review[0]['user_id']) return next({ status: 401, message: 'Unauthorized'})
    dataModel.modifyUserOrders(req.params.userId, req.params.orderId, req.claim.id, req.body)
    .then((data) => res.status(200).json({ data }))
    .catch(next)
  })
  .catch(next)
}

const removeUserOrder = (req, res, next) => {
  dataModel.authGetOne(req.params.userId, req.params.reviewId)
  .then(review => {
    if(req.claim.id !== review[0]['user_id']) return next({ status: 401, message:  'Unauthorized'})
    dataModel.removeUserOrder(req.params.orderId)
    .then((data) => res.status(200).json({ data }))
    .catch(next)
  })
  .catch(next)
}

module.exports = { authGetOne, getAllShops, getAllProducts, getAllUserOrders, createUserOrders, modifyUserOrders, removeUserOrder }
