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
  hoursOfOperation: {
    type: DataTypes.STRING,
  },
  totalCapacity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: { min: 0 }
  },
  availableCapacity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
      notExceedTotal(value) {
        if (value > this.totalCapacity) {
          throw new Error('Available capacity cannot exceed total capacity')
        }
      }
    }
  }
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