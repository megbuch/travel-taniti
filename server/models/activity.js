
const { DataTypes } = require('sequelize')
const { sequelize } = require('../config/database')
const { Service, serviceSchema } = require('./service')

class Activity extends Service {}

const schema = {
  ...serviceSchema,
  companyName: {
    type: DataTypes.STRING
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
  },
  isRecurring: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  time: {
    type: DataTypes.TIME
  },
  oneTimeDate: {
    type: DataTypes.DATEONLY
  },
  recurringDays: {
    type: DataTypes.ARRAY(DataTypes.STRING)
  },
  recurringStartDate: {
    type: DataTypes.DATEONLY
  },
  recurringEndDate: {
    type: DataTypes.DATEONLY
  }
}

const options = {
  sequelize,
  modelName: 'Activity',
  tableName: 'activities',
  timestamps: true,
  underscored: true,
  validate: {
    validActivityType() {
      if (this.isRecurring) {
        if (!this.recurringDays || !this.time || !this.recurringStartDate) {
          throw new Error('Recurring activities must have days, time, and start date')
        }
      } else {
        if (!this.oneTimeDate) {
          throw new Error('One-time activities must have a date')
        }
      }
    }
  }
}

Activity.init(schema, options)
module.exports = Activity