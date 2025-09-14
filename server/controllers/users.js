const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { Op } = require('sequelize')
const { handleError } = require('../utils/errorHandler')

const SALT_ROUNDS = 10

const getUsers = async (req, res) => {
  try {
    const { name } = req.query
    const whereClause = { role: 'traveler' }
    if (name) {
      whereClause[Op.or] = [
        { firstName: { [Op.iLike]: `%${name}%` } },
        { lastName: { [Op.iLike]: `%${name}%` } }
      ]
    }
    const users = await User.findAll({ where: whereClause })
    return res.status(200).json({ users })
  } catch (error) {
    handleError(res, error, 'Could not get users')
  }
}

const createUser = async (req, res) => {
  try {
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
    const userData = { 
      id: user.id,
      email: user.email, 
      firstName: user.firstName, 
      lastName: user.lastName,
      role: user.role
    }
    const accessToken = jwt.sign(userData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION })
    res.status(201).json({ user: userData, accessToken })
  } catch (error) {
    handleError(res, error, 'Could not create user')
  }
}

module.exports = {
  getUsers,
  createUser
}