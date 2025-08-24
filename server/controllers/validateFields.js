const validateFields = (requiredFields = [], req, res) => {
  if (!req.body) {
    res.status(400).json({ error: 'Request body is required' })
    return false
  }
  const missingFields = requiredFields.filter(field => !req.body[field])
  if (missingFields.length > 0) {
    res.status(400).json({ error: `Missing required fields: ${missingFields.join(', ')}` })
    return false
  }
  return true
}

module.exports = validateFields