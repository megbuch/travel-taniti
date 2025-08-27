const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: process.env.NODE_ENV === 'production' ? {
      require: true,
      rejectUnauthorized: false
    } : false
  }
})
sequelize.authenticate()
  .then(() => console.log('Connected to PostgreSQL database via Sequelize'))
  .catch(error => console.error('Could not connect to PostgreSQL database:', error))
  
const initializeDatabase = async () => {
  try {
    await sequelize.authenticate()
    const User = require('../models/user')
    await User.sync({ force: false })
    const Accommodation = require('../models/accommodation')
    await Accommodation.sync({ force: false })
    const RoomType = require('../models/roomType')
    await RoomType.sync({ force: false })
    const Restaurant = require('../models/restaurant')
    await Restaurant.sync({ force: false })
    const Activity = require('../models/activity')
    await Activity.sync({ force: false })
    console.log('Database tables created/verified')
  } catch (error) {
    console.error('Database initialization failed:', error)
  }
}

module.exports = { sequelize, initializeDatabase }