const express = require('express')
const router = express.Router()
const usersController = require('../controllers/users')
// const { authenticateToken } = require('../middleware/authentications')

router.get('/', usersController.getUsers)
router.post('/', usersController.createUser)

module.exports = router