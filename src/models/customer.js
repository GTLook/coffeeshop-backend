const db = require('../../db/knex')
const shortid = require('shortid')


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

const getAllShops = () => {
  return (
    db('shops')
  )
}

const getAllProducts = () => {
  const shopsProducts = []
  return getAllShops()
  .then(shops => {
    shops.map(shop => shopsProducts.push({shop, orderItems: []}))
    return (
      db('products')
      .leftJoin('product_with_options', 'product_with_options.product_id', 'products.id')
      .leftJoin('product_option_size', 'product_option_size.id', 'product_with_options.drink_size')
      .leftJoin('product_option_milk', 'product_option_milk.id', 'product_with_options.milk_type')
    )
  })
  .then(products => {
    products.map(product => shopsProducts
      .find(el => el.shop.id === product.shop_id)
      .orderItems.push(product))
    return shopsProducts
  })
}


const getAllOptions = () => {
  let options = {}
  return  (
    db('product_option_size')
  )
  .then(size => {
    options = {...options, size}
    return  (
      db('product_option_milk')
    )
  })
  .then(milk => {
    options = {...options, milk}
    return  (
      db('product_option_extra')
    )
  })
  .then(extra => {
    options = {...options, extra}
    return options
  })
}



const getAllUserOrders = (userId) => {
  let detailedOrders = []
  return (
    db('order_ledger')
    .where({ order_user_id: userId })
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

// '{"shopId":"1","pickupTime":"2018-05-05 06:00:00","orderItems":[{"productWithOptionsId":"2","sizeId":"3","milkId":"2","extraId":"1","extraShots":2},{"productWithOptionsId":"1","sizeId":"1","milkId":"1","extraId":"1","extraShots":0}]}'


const createUserOrders = (userId, payload) => {
  const order_shortid = shortid.generate()
  const order_user_id = userId
  const order_shop_id = payload.shopId
  const is_fulfilled = false
  const is_canceled = false
  const pickup_time = payload.pickupTime
  const items = payload.orderItems

  return (
    db('order_ledger')
    .insert({order_shortid, order_user_id, order_shop_id, is_fulfilled,is_canceled,pickup_time})
    .returning('*')
  )
  .then(order => {
    return  (
      db('order_product')
      .insert(items.map(item=>({
        order_id: order[0].id,
        product_with_options_id: item.productWithOptionsId,
        product_option_size: item.sizeId,
        product_option_milk: item.milkId,
        product_option_extra: item.extraId,
        extra_espresso_shots: item.extraShots
      })))
      .returning('*')
    )
  })
}


const modifyUserOrders = (userId, orderId, shopId, {is_fulfilled, is_canceled}) => {
  return (
    db('order_ledger')
    .where({ order_user_id: userId })
    .update({ is_fulfilled: is_fulfilled, is_canceled: is_canceled})
    .returning('*')
  )
}

const removeUserOrder = (reviewId) => {
  // return (
  //   db('reviews')
  //   .where({ id: reviewId })
  //   .first()
  //   .del()
  //   .returning('*')
  // )
}


module.exports = { authGetOne, getAllShops, getAllProducts, getAllUserOrders, createUserOrders, modifyUserOrders, removeUserOrder, getAllOptions }
