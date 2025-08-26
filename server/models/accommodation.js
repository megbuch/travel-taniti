const { DataTypes } = require('sequelize')
const { sequelize } = require('../config/database')
const { Service, serviceSchema } = require('./service')

class Accommodation extends Service {}

const schema = {
  ...serviceSchema,
  amenities: {
    type: DataTypes.ARRAY(DataTypes.STRING),
  },
  checkInTime: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { notEmpty: true }

  },
  checkOutTime: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { notEmpty: true }
  }
}

const options = {
  sequelize,
  modelName: 'Accommodation',
  tableName: 'accommodations',
  timestamps: true,
  underscored: true
}

Accommodation.init(schema, options)
module.exports = Accommodation