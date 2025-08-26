const express = require('express')
const router = express.Router()
const accommodationsController = require('../controllers/accommodations')

router.get('/', accommodationsController.getAccommodations)
router.post('/', accommodationsController.createAccommodation)
router.put('/:id', accommodationsController.updateAccommodation)
router.delete('/:id', accommodationsController.deleteAccommodation)

module.exports = router