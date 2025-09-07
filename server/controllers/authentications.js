const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const createAuthentication = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.scope('withPassword').findOne({ where: { email } })
    if (!user) {
      return res.status(400).json({ error: 'Incorrect email or password' })
    }
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
      return res.status(400).json({ error: 'Incorrect email or password' })
    }
    const userData = { 
      id: user.id,
      email: user.email, 
      firstName: user.firstName, 
      lastName: user.lastName,
      role: user.role
    }
    const accessToken = jwt.sign(userData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION })
    res.json({ user: userData, accessToken }) 
  } catch (error) {
    console.log(error)
    return res.status(400).json({ error: 'Could not authenticate' })
  }
}

module.exports = {
  createAuthentication
}