const express = require('express')
const router = express.Router()
const authenticationsController = require('../controllers/authentications')
// const { authenticateToken } = require('../middleware/authentications')

router.post('/login', authenticationsController.login)

module.exports = router