const { DataTypes, Model } = require('sequelize')
const { sequelize } = require('../config/database')

class RoomType extends Model {}

const schema = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  accommodationID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'accommodations', key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  maxGuests: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: { min: 1 }
  },
  pricePerNight: {
    type: DataTypes.DECIMAL(4,2),
    allowNull: false,
    validate: { min: 0 }
  },
  totalRooms: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: { min: 0 }
  },
  availableRooms: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
      notExceedTotal(value) {
        if (value > this.total_rooms) {
          throw new Error('Available rooms cannot exceed total rooms')
        }
      }
    }
  }
}

const options = {
  sequelize,
  modelName: 'RoomType',
  tableName: 'room_types',
  timestamps: true,
}

RoomType.init(schema, options)
module.exports = RoomType