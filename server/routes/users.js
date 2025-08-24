const express = require('express')
const router = express.Router()
const usersController = require('../controllers/users')
// const { authenticateToken } = require('../middleware/authentications')

router.post('/', usersController.create)

module.exports = router