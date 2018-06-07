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

const getAllStoreOrders = (ownerId) => {
  let detailedOrders = []
  return (
    db('order_ledger')
    .innerJoin('shops', 'shops.id', 'order_ledger.order_shop_id')
    .innerJoin('users', 'users.id', 'order_ledger.order_user_id')
    .where({ owner_id: ownerId })
    // .update({ hashed_password: '' })
    .select(['*', 'order_ledger.id as id'])
  )
  .then(orders => {
    detailedOrders = orders.map(order=>({...order, orderItems:[]}))
    return (
      db('order_product')
      .innerJoin('product_with_options', 'product_with_options.id', 'order_product.product_with_options_id')
      .innerJoin('products', 'products.id', 'product_with_options.product_id')
      .innerJoin('product_option_size', 'product_option_size.id', 'product_with_options.drink_size')
      .innerJoin('product_option_milk', 'product_option_milk.id', 'product_with_options.milk_type')
      .select(['*',  'order_product.id as id'])
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

const modifyStoreOrders = (orderId,is_fulfilled,is_canceled) => {
  return (
    db('order_ledger')
    .where({ id: orderId })
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
