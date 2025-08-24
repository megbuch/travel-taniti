require('dotenv').config()
const bcrypt = require('bcrypt')
const User = require('../models/user')

const createAdmin = async () => {
  const email = process.env.TEST_ADMIN_EMAIL
  const password = process.env.TEST_ADMIN_PASSWORD
  if (!email || !password) return
  try {
    const existingAdmin = await User.findOne({ where: { email } })
    if (existingAdmin) {
      console.log('Admin user already exists')
      return
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({
      email,
      password: hashedPassword,
      firstName: 'Samantha',
      lastName: 'Jennings',
      role: 'admin'
    })
    console.log(`Admin user created. Email: ${user.email} Role: ${user.role}`)
    delete process.env.CREATE_ADMIN_EMAIL
    delete process.env.CREATE_ADMIN_PASSWORD
  } catch (error) {
    console.error('Error creating admin: ', error)
  }
}

createAdmin()