const express = require('express')
const router = express.Router()
const unsplashController = require('../controllers/unsplash')

router.post('/search', unsplashController.searchForImages)

module.exports = router
