const express = require('express')
const router = express.Router()
const dataController = require('../controllers/shop')
const authController = require('../controllers/auth')


//////////////////////////////////////////////////////////////////////////////
// Basic CRUD Methods
//////////////////////////////////////////////////////////////////////////////

router.get('/userOrders/:userId', authController.isAuthenticated, dataController.getAllUserOrders)
router.post('/userOrders/:userId', authController.isAuthenticated, dataController.createUserOrders)
router.patch('/userOrders/:userId/orders/:orderId', authController.isAuthenticated, dataController.modifyUserOrders)
router.delete('/userOrders/:userId/orders/:orderId', authController.isAuthenticated, dataController.remove)

module.exports = router
