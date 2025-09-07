const express = require('express')
const router = express.Router()
const activitiesController = require('../controllers/activities')
const { authenticateToken, requireAdmin } = require('../middleware/authentications')

router.get('/', activitiesController.getActivities)
router.post('/', authenticateToken, requireAdmin, activitiesController.createActivity)
router.put('/:id', authenticateToken, requireAdmin, activitiesController.updateActivity)
router.delete('/:id', authenticateToken, requireAdmin, activitiesController.deleteActivity)

module.exports = router