const express = require('express')
const router = express.Router()
const roomTypesController = require('../controllers/roomTypes')

router.post('/', roomTypesController.create)

module.exports = router