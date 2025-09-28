const express = require('express')
const router = express.Router()
const unsplashController = require('../controllers/unsplash')
const { authenticateToken, requireAdmin } = require('../middleware/authentications')

router.post('/search', authenticateToken, requireAdmin, unsplashController.searchForImages)

module.exports = router
