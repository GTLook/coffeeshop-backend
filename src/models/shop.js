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

const getAllStoreOrders = () => {
  return (
    db('reviews')
  )
}

const modifyStoreOrders = (snackId, reviewId, userId, {title, text, rating}) => {
  return (
    db('reviews')
    .where({ id: reviewId })
    .update({title, text, rating, snack_id: snackId, user_id: userId})
    .returning('*')
  )
}

const removeStoreOrder = (reviewId) => {
  return (
    db('reviews')
    .where({ id: reviewId })
    .first()
    .del()
    .returning('*')
  )
}

module.exports = { authGetOne, getAllStoreOrders, modifyStoreOrders, removeStoreOrder }
