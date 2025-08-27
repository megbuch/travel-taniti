const { DataTypes } = require('sequelize')
const { sequelize } = require('../config/database')
const { Service, serviceSchema } = require('./service')

class Activity extends Service {}

const schema = {
  ...serviceSchema,
  companyName: {
    type: DataTypes.STRING,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  durationMinutes: {
    type: DataTypes.INTEGER,
    validate: { min: 0 }
  },
  pricePerPerson: {
    type: DataTypes.DECIMAL(10,2)
  },
  maxParticipants: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}

const options = {
  sequelize,
  modelName: 'Activity',
  tableName: 'activities',
  timestamps: true,
  underscored: true
}

Activity.init(schema, options)
module.exports = Activity