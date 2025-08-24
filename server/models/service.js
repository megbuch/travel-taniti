const { DataTypes, Model } = require('sequelize')

class Service extends Model {}

const schema = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { notEmpty: true }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: { notEmpty: true }
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { notEmpty: true }
  },
  contactEmail: {
    type: DataTypes.STRING,
    validate: { isEmail: true },
  },
  contactPhone: {
    type: DataTypes.STRING,
  },
  rating: {
    type: DataTypes.DECIMAL(2,1),
    defaultValue: 0,
    validate: { min: 0, max: 5 }
  },
  imageURL: {
    type: DataTypes.STRING,
  }
}

module.exports = { Service, serviceSchema: schema }