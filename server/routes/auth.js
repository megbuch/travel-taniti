const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth')
// const { authenticateToken } = require('../middleware/auth')

router.post('/login', authController.login)

module.exports = router