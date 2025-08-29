const { DataTypes } = require('sequelize')
const { sequelize } = require('../config/database')
const { Service, serviceSchema } = require('./service')

class Restaurant extends Service {}

const schema = {
  ...serviceSchema,
  cuisineType: {
    type: DataTypes.STRING,
  },
  priceRange: {
    type: DataTypes.STRING,
    validate: { isIn: [['$', '$$', '$$$']] }
  },
  operatingDays: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false
  },
  openTime: {
    type: DataTypes.TIME,
    allowNull: false
  },
  closeTime: {
    type: DataTypes.TIME,
    allowNull: false
  },
  maxCapacity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: { min: 0 }
  },
}

const options = {
  sequelize,
  modelName: 'Restaurant',
  tableName: 'restaurants',
  timestamps: true,
  underscored: true
}

Restaurant.init(schema, options)
module.exports = Restaurant