const { DataTypes, Model } = require('sequelize')
const { sequelize } = require('../config/database')

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
    validate: { isEmail: true },
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'traveler',
    allowNull: false,
    validate: { isIn: [['traveler', 'admin']] }
  }
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