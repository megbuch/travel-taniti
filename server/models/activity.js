
const { DataTypes } = require('sequelize')
const { sequelize } = require('../config/database')
const { Service, serviceSchema } = require('./service')

class Activity extends Service {}

const schema = {
  ...serviceSchema,
  companyName: {
    type: DataTypes.STRING,
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
  oneTimeDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  recurringDays: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true
  },
  recurringTime: {
    type: DataTypes.TIME,
    allowNull: true
  },
  recurringStartDate: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  recurringEndDate: {
    type: DataTypes.DATEONLY,
    allowNull: true
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
        if (!this.recurringDays || !this.recurringTime || !this.recurringStartDate) {
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

const getAvailableDates = (fromDate, toDate) => {
  if (!this.isRecurring) {
    const activityDate = new Date(this.oneTimeDate)
    if (activityDate >= fromDate && activityDate <= toDate) {
      return [activityDate]
    }
    return []
  }
  
  const availableDates = []
  const current = new Date(Math.max(fromDate, new Date(this.recurringStartDate)))
  const end = this.recurringEndDate ? 
    new Date(Math.min(toDate, new Date(this.recurringEndDate))) : 
    toDate
  
  while (current <= end) {
    const dayName = current.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase()
    if (this.recurringDays.includes(dayName)) {
      const [hours, minutes] = this.recurringTime.split(':')
      const dateTime = new Date(current)
      dateTime.setHours(parseInt(hours), parseInt(minutes), 0, 0)
      availableDates.push(new Date(dateTime))
    }
    current.setDate(current.getDate() + 1)
  }
  
  return availableDates
}
Activity.prototype.getAvailableDates = getAvailableDates