const express = require('express')
const router = express.Router()
const dataController = require('../controllers/shop')
const authController = require('../controllers/auth')


//////////////////////////////////////////////////////////////////////////////
// Basic CRUD Methods
//////////////////////////////////////////////////////////////////////////////

router.get('/userOrders/:userId', authController.isAuthenticated, dataController.getAllStoreOrders)
router.post('/userOrders/:userId', authController.isAuthenticated, dataController.createStoreOrders)
router.patch('/userOrders/:userId/orders/:orderId', authController.isAuthenticated, dataController.modifyStoreOrders)
router.delete('/userOrders/:userId/orders/:orderId', authController.isAuthenticated, dataController.removeStoreOrder)

module.exports = router
