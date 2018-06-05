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
    db('reviews')
  )
}

const getAllProducts = () => {
  return (
    db('reviews')
  )
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
