const express = require('express')
const router = express.Router()
const roomTypesController = require('../controllers/roomTypes')
const { authenticateToken, requireAdmin } = require('../middleware/authentications')

router.post('/', authenticateToken, requireAdmin, roomTypesController.createRoomType)

module.exports = router