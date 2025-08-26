const { handleError } = require('../utils/errorHandler')
  
const searchForImages = async (req, res) => {
  try {
    const { query, per_page = 12, orientation = 'landscape' } = req.body
    if (!query) {
      return res.status(400).json({ error: 'Query is required' })
    }
    const unsplashUrl = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=${per_page}&orientation=${orientation}`
    const response = await fetch(unsplashUrl, {
      headers: {
        'Authorization': `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`
      }
    });
    if (!response.ok) {
      throw new Error(`Unsplash API error: ${response.statusText}`)
    }
    const data = await response.json()
    res.json(data)
  } catch (error) {
    handleError(res, error, 'Could not fetch images')
  }
}

module.exports = {
  searchForImages
}