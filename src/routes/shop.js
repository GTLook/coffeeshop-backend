const express = require('express')
const router = express.Router()
const dataController = require('../controllers/shop')
const authController = require('../controllers/auth')


//////////////////////////////////////////////////////////////////////////////
// Basic CRUD Methods
//////////////////////////////////////////////////////////////////////////////

router.get('/:userId/orders', authController.isAuthenticated, dataController.getAllStoreOrders)
router.post('/:userId/orders', authController.isAuthenticated, dataController.createStoreOrders)
router.patch('/:userId/orders/:orderId', authController.isAuthenticated, dataController.modifyStoreOrders)
router.delete('/:userId/orders/:orderId', authController.isAuthenticated, dataController.removeStoreOrder)

module.exports = router
