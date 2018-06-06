const db = require('../../db/knex')
const shortid = require('shortid')


//////////////////////////////////////////////////////////////////////////////
// Auth check for user
//////////////////////////////////////////////////////////////////////////////

const authGetOne = (snackId, reviewId) => {
  return (
    db('reviews')
    .where({ snack_id: snackId, id: reviewId })
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
  return (
    db('order_ledger')
    .where({ order_user_id: userId })
  )
}

const createUserOrders = (userId, payload) => {
  const order_shortid = shortid.generate()
  const order_user_id = userId
  const order_shop_id = 1
  const is_fulfilled = false
  const is_canceled = false
  const pickup_time = '2018-05-05 06:00:00'
  const product_with_options_id = 1
  const product_option_size = 1
  const product_option_milk = 1
  const product_option_extra = 1
  const extra_espresso_shots = 0
  const items = [1,2,3,4]

  return (
    db('order_ledger')
    .insert({order_shortid, order_user_id, order_shop_id, is_fulfilled,is_canceled,pickup_time})
    .returning('*')
  )
  .then(order => {
    return  (
      db('order_product')
      .insert(items.map(el=>({order_id: order[0].id, product_with_options_id, product_option_size, product_option_milk, product_option_extra, extra_espresso_shots})))
      .returning('*')
    )
  })
}





const modifyUserOrders = (snackId, reviewId, userId, {title, text, rating}) => {
  return (
    db('reviews')
    .where({ id: reviewId })
    .update({title, text, rating, snack_id: snackId, user_id: userId})
    .returning('*')
  )
}

const removeUserOrder = (reviewId) => {
  return (
    db('reviews')
    .where({ id: reviewId })
    .first()
    .del()
    .returning('*')
  )
}


module.exports = { authGetOne, getAllShops, getAllProducts, getAllUserOrders, createUserOrders, modifyUserOrders, removeUserOrder, getAllOptions }
