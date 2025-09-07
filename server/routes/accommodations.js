const express = require('express')
const router = express.Router()
const accommodationsController = require('../controllers/accommodations')
const { authenticateToken, requireAdmin } = require('../middleware/authentications')

router.get('/', accommodationsController.getAccommodations)
router.get('/:id', accommodationsController.getAccommodation)
router.post('/', authenticateToken, requireAdmin, accommodationsController.createAccommodation)
router.put('/:id', authenticateToken, requireAdmin, accommodationsController.updateAccommodation)
router.delete('/:id', authenticateToken, requireAdmin, accommodationsController.deleteAccommodation)

module.exports = router