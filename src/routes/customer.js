const express = require('express')
const router = express.Router()
const dataController = require('../controllers/customer')
const authController = require('../controllers/auth')


//////////////////////////////////////////////////////////////////////////////
// Basic CRUD Methods
//////////////////////////////////////////////////////////////////////////////

router.get('/shops/', dataController.getAllShops)
router.get('/products/', dataController.getAllProducts)
router.get('/options/', dataController.getAllOptions)

router.get('/user/:userId/favorites', authController.isAuthenticated, dataController.getAllUserFavorites)
router.get('/user/:userId/orders', authController.isAuthenticated, dataController.getAllUserOrders)
router.post('/user/:userId/orders', authController.isAuthenticated, dataController.createUserOrders)
router.patch('/user/:userId/orders/:orderId', authController.isAuthenticated, dataController.modifyUserOrders)
router.delete('/user/:userId/orders/:orderId', authController.isAuthenticated, dataController.removeUserOrder)

module.exports = router
