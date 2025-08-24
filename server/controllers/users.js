const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const validateFields = require('./validateFields')

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
    const accessToken = jwt.sign({ userID: user.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION })
    res.json({ 
      user: { 
        id: user.id,
        email, 
        firstName, 
        lastName 
      }, 
      accessToken 
    })
  } catch (error) {
    console.log(error)
    return res.status(400).json({ error: 'Could not create user' })
  }
}

module.exports = {
  create
}