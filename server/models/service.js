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
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false
  },
  contactEmail: {
    type: DataTypes.STRING,
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