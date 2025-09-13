const express = require('express')
const router = express.Router()
const usersController = require('../controllers/users')
const { authenticateToken, requireAdmin } = require('../middleware/authentications')

router.get('/', authenticateToken, requireAdmin, usersController.getUsers)
router.post('/', usersController.createUser)

module.exports = router