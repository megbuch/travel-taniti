const express = require('express')
const router = express.Router()
const accommodationsController = require('../controllers/accommodations')

router.post('/', accommodationsController.createAccommodation)
router.get('/', accommodationsController.getAccommodations)
router.put('/:id', accommodationsController.updateAccommodation)

module.exports = router