const express = require('express')
const router = express.Router()
const authenticationsController = require('../controllers/authentications')

router.post('/', authenticationsController.createAuthentication)

module.exports = router