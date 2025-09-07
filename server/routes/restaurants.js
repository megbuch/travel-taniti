const express = require('express')
const router = express.Router()
const restaurantsController = require('../controllers/restaurants')
const { authenticateToken, requireAdmin } = require('../middleware/authentications')

router.get('/', restaurantsController.getRestaurants)
router.post('/', authenticateToken, requireAdmin, restaurantsController.createRestaurant)
router.put('/:id', authenticateToken, requireAdmin, restaurantsController.updateRestaurant)
router.delete('/:id', authenticateToken, requireAdmin, restaurantsController.deleteRestaurant)

module.exports = router