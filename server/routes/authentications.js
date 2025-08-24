const express = require('express')
const router = express.Router()
const authenticationsController = require('../controllers/authentications')
// const { authenticateToken } = require('../middleware/authentications')

router.post('/', authenticationsController.createAuthentication)

module.exports = router