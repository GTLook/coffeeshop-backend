const db = require('../../db/knex')

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
    )
  })
  .then(products => {
    products.map(product => shopsProducts
      .find(el => el.shop.id === product.shop_id)
      .orderItems.push(product))
    return shopsProducts
  })

}

const getAllUserOrders = () => {
  return (
    db('reviews')
  )
}

const createUserOrders = (snackId, userId, {title, text, rating}) => {
  return (
    db('reviews')
    .insert({title, text, rating, snack_id: snackId, user_id: userId})
    .returning('*')
  )
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


module.exports = { authGetOne, getAllShops, getAllProducts, getAllUserOrders, createUserOrders, modifyUserOrders, removeUserOrder }
