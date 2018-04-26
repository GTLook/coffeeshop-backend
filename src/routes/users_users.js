const express = require('express')
const router = express.Router()
const friendshipController = require('../controllers/users_users')
const authController = require('../controllers/auth')

//////////////////////////////////////////////////////////////////////////////
// Basic CRUD Methods
//////////////////////////////////////////////////////////////////////////////

router.post('/', authController.isAuthenticated, friendshipController.create)
router.delete('/', authController.isAuthenticated, friendshipController.remove)
router.get('/', authController.isAuthenticated, friendshipController.get)



module.exports = router
