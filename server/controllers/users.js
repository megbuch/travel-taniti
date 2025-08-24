const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const SALT_ROUNDS = 10

const create = async (req, res) => {
  try {
    const requiredFields = ['email', 'password', 'firstName', 'lastName']
    if (!validateFields(requiredFields, req, res)) return
    const { email, password, firstName, lastName } = req.body
    const existingUser = await User.findOne({ where: { email } })
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' })
    }
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)
    const user = await User.create({ 
      email, 
      password: hashedPassword, 
      firstName, 
      lastName 
    })
    const accessToken = jwt.sign({ userID: user.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h' })
    res.json({ accessToken: accessToken })
  } catch (error) {
    console.log(error)
    return res.status(400).json({ error: 'Invalid field(s)' })
  }
}

module.exports = {
  create
}

function validateFields(requiredFields = [], req, res) {
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