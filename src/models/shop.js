const db = require('../../db/knex')

//////////////////////////////////////////////////////////////////////////////
// Auth check for user
//////////////////////////////////////////////////////////////////////////////

const authGetOne = (userId) => {
  return (
    db('users')
    .where({ id: userId })
    .returning('*')
  )
}

//////////////////////////////////////////////////////////////////////////////
// Basic CRUD Methods
//////////////////////////////////////////////////////////////////////////////

const getAllStoreOrders = (shopId) => {
  let detailedOrders = []
  return (
    db('order_ledger')
    .where({ order_shop_id: shopId })
  )
  .then(orders => {
    detailedOrders = orders.map(order=>({...order, orderItems:[]}))
    return (
      db('order_product')
    )
  })
  .then(items => {
    items.map(item => {
      const order = detailedOrders.find(order => order.id === item.order_id)
      order ? order.orderItems.push(item) : null
    })
    return detailedOrders
  })
}

const modifyStoreOrders = (shopId, orderId, userId, {is_fulfilled, is_canceled}) => {
  return (
    db('order_ledger')
    .where({ order_shop_id: shopId })
    .update({ is_fulfilled: is_fulfilled, is_canceled: is_canceled})
    .returning('*')
  )
}

const removeStoreOrder = (reviewId) => {
  // return (
  //   // db('reviews')
  //   // .where({ id: reviewId })
  //   // .first()
  //   // .del()
  //   // .returning('*')
  // )
}

module.exports = { authGetOne, getAllStoreOrders, modifyStoreOrders, removeStoreOrder }
