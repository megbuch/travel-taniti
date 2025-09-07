const express = require('express')
const router = express.Router()
const roomTypesController = require('../controllers/roomTypes')
const { authenticateToken, requireAdmin } = require('../middleware/authentications')

router.post('/', authenticateToken, requireAdmin, roomTypesController.createRoomType)
router.delete('/:id', authenticateToken, requireAdmin, roomTypesController.deleteRoomType)

module.exports = router