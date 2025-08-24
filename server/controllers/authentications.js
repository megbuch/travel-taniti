const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const validateFields = require('./validateFields')

const create = async (req, res) => {
  try {
    const requiredFields = ['email', 'password']
    if (!validateFields(requiredFields, req, res)) return
    const { email, password } = req.body
    const user = await User.scope('withPassword').findOne({ where: { email } })
    if (!user) {
      return res.status(400).json({ error: 'Incorrect email or password' })
    }
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
      return res.status(400).json({ error: 'Incorrect email or password' })
    }
    const accessToken = jwt.sign({ userID: user.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION })
    res.json({ 
      user: { 
        id: user.id,
        email: user.email, 
        firstName: user.firstName, 
        lastName: user.lastName
      }, 
      accessToken 
    }) 
  } catch (error) {
    console.log(error)
    return res.status(400).json({ error: 'Could not authenticate' })
  }
}

module.exports = {
  create
}