const express = require('express')
const router = express.Router()
const bookingsController = require('../controllers/bookings')
const { authenticateToken, requireAdmin } = require('../middleware/authentications')

router.get('/', authenticateToken, bookingsController.getBookings)
router.get('/:id', authenticateToken, bookingsController.getBooking)
router.post('/', authenticateToken, bookingsController.createBooking)
router.put('/:id', authenticateToken, bookingsController.updateBooking)
router.delete('/:id', authenticateToken, requireAdmin, bookingsController.deleteBooking)

module.exports = router