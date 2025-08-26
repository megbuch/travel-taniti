const Restaurant = require('../models/restaurant')
const RoomType = require('../models/roomType')
const { handleError } = require('../utils/errorHandler')

const getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.findAll()
    for (const restaurant of restaurants) {
      restaurant.dataValues.roomTypes = await RoomType.findAll({ 
        where: { accommodationID: restaurant.id } 
      })
    }
    res.status(200).json({ restaurants })
  } catch (error) {
    handleError(res, error, 'Could not fetch restaurants')
  }
}

const createRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.create(req.body)
    res.status(201).json({ restaurant })
  } catch (error) {
    handleError(res, error, 'Could not create restaurant')
  }
}

const updateRestaurant = async (req, res) => {
  try {
    const { id } = req.params
    const restaurant = await Restaurant.findByPk(id)
    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' })
    }
    const updatedAccommodation = await restaurant.update(req.body)
    res.status(200).json({ restaurant: updatedAccommodation })
  } catch (error) {
    handleError(res, error, 'Could not update restaurant')
  }
}

const deleteRestaurant = async (req, res) => {
  try {
    const { id } = req.params
    const deletedCount = await Restaurant.destroy({ where: { id } })
    if (deletedCount === 0) {
      return res.status(404).json({ error: 'Restaurant not found' })
    }
    res.status(200).json({ message: 'Restaurant deleted' })
  } catch (error) {
    handleError(res, error, 'Could not delete restaurant')
  }
}

module.exports = {
  getRestaurants,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant
}