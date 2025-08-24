const { DataTypes, Model } = require('sequelize')
const { sequelize } = require('../config/database')
const bcrypt = require('bcrypt')

const SALT_ROUNDS = 10

class User extends Model {}

const schema = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: { 
      isEmail: true,
      notEmpty: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { notEmpty: true }
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { notEmpty: true }
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { notEmpty: true }
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'traveler',
    allowNull: false,
    validate: { isIn: [['traveler', 'admin']] },
    set(value) {
      const isAdminCreation = (this.isNewRecord && this.email === process.env.TEST_ADMIN_EMAIL)
      if (isAdminCreation && value === 'admin') {
        this.setDataValue('role', 'admin')
      } else {
        this.setDataValue('role', 'traveler')
      }
    }
  },
}

const options = {
  sequelize,
  modelName: 'User',
  tableName: 'users',
  timestamps: true,
  defaultScope: {
    attributes: { exclude: ['password'] }
  },
  scopes: {
    withPassword: {
      attributes: { include: ['password'] }
    }
  },
  hooks: {
    beforeCreate: async (user) => {
      user.email = user.email.toLowerCase()
    }
  }
}

User.init(schema, options)
module.exports = User