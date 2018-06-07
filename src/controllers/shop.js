const dataModel = require('../models/shop')

//////////////////////////////////////////////////////////////////////////////
// CRUD for users by StoreId
//////////////////////////////////////////////////////////////////////////////

const getAllStoreOrders = (req, res, next) => {
  console.log(req.claim.id)
  dataModel.getAllStoreOrders(req.claim.id)
  .then((data) => res.status(200).json({ data }))
  .catch(next)
}






const createStoreOrders = (req, res, next) => {
  dataModel.authGetOne(req.params.storeId)
  .then(review => {
    if(!req.params.storeId) return next({ status: 400, message: 'Error: Specify userId'})
    if(req.claim.id !== review[0]['store_id']) return next({ status: 401, message: 'Unauthorized'})
    dataModel.createUserOrders(req.params.storeId, req.claim.id, req.body)
      .then((data) => res.status(200).json({ data }))
      .catch(next)
      })
    .catch(next)
}



const modifyStoreOrders = (req, res, next) => {
  console.log(req.claim.id)
  // add verification here
  if(!req.params.orderId) return next({ status: 400, message: 'Error: Specify order id'})
  const {is_fulfilled, is_canceled} = req.body
  dataModel.modifyStoreOrders(req.params.orderId, is_fulfilled, is_canceled)
  .then((data) => res.status(200).json({ data }))
  .catch(next)
}

const removeStoreOrder = (req, res, next) => {
  dataModel.authGetOne(req.params.storeId, req.params.orderId)
  .then(review => {
    if(req.claim.id !== review[0]['user_id']) return next({ status: 401, message:  'Unauthorized'})
    dataModel.removeUserOrder(req.params.orderId)
    .then((data) => res.status(200).json({ data }))
    .catch(next)
  })
  .catch(next)
}

module.exports = { getAllStoreOrders, createStoreOrders, modifyStoreOrders, removeStoreOrder }
