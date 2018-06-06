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

router.get('/userFavorites/:userId', authController.isAuthenticated, dataController.getAllUserFavorites)

router.get('/userOrders/:userId', authController.isAuthenticated, dataController.getAllUserOrders)
router.post('/userOrders/:userId', authController.isAuthenticated, dataController.createUserOrders)
router.patch('/userOrders/:userId/orders/:orderId', authController.isAuthenticated, dataController.modifyUserOrders)
router.delete('/userOrders/:userId/orders/:orderId', authController.isAuthenticated, dataController.removeUserOrder)

module.exports = router
