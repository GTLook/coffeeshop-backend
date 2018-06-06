const express = require('express')
const router = express.Router()
const dataController = require('../controllers/shop')
const authController = require('../controllers/auth')


//////////////////////////////////////////////////////////////////////////////
// Basic CRUD Methods
//////////////////////////////////////////////////////////////////////////////

router.get('/:shopId/orders', authController.isAuthenticated, dataController.getAllStoreOrders)
router.post('/:shopId/orders', authController.isAuthenticated, dataController.createStoreOrders)
router.patch('/:shopId/orders/:orderId', authController.isAuthenticated, dataController.modifyStoreOrders)
router.delete('/:shopId/orders/:orderId', authController.isAuthenticated, dataController.removeStoreOrder)

module.exports = router
