const { DataTypes, Model } = require('sequelize')
const { sequelize } = require('../config/database')

class Booking extends Model {}

const schema = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  userID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'users', key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  bookingType: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { isIn: [['accommodation', 'restaurant', 'activity']] }
  },
  bookableID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  roomTypeID: {
    type: DataTypes.INTEGER,
    references: { model: 'room_types', key: 'id' },
    onUpdate: 'CASCADE'
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  status: {
    type: DataTypes.STRING,
    validate: { isIn: [['confirmed', 'completed', 'pendingCancellation']] },
    defaultValue: 'confirmed'
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false
  }
}

const options = {
  sequelize,
  modelName: 'Booking',
  tableName: 'bookings',
  timestamps: true,
  underscored: true
}

Booking.init(schema, options)
module.exports = Booking