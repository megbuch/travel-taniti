const Restaurant = require('../models/restaurant')
const Booking = require('../models/booking')
const { Op } = require('sequelize')
const { handleError } = require('../utils/errorHandler')

const getRestaurants = async (req, res) => {
  try {
    const { name } = req.query
    const whereClause = {}
    if (name) {
      whereClause.name = { [Op.iLike]: `%${name}%` }
    }
    const restaurants = await Restaurant.findAll({ where: whereClause })
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
    const deletedCount = await Restaurant.destroy({ where: { id: id } })
    if (deletedCount === 0) {
      return res.status(404).json({ error: 'Restaurant not found' })
    }
    res.status(200).json({ message: 'Restaurant deleted' })
  } catch (error) {
    handleError(res, error, 'Could not delete restaurant')
  }
}

const getRestaurantAvailability = async (req, res) => {
  try {
    const { id } = req.params
    const { date } = req.query
    if (!date) {
      return res.status(400).json({ error: 'Date parameter is required' })
    }

    const restaurant = await Restaurant.findByPk(id)
    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' })
    }

    const today = new Date()
    const todayString = today.getFullYear() + '-' + 
      String(today.getMonth() + 1).padStart(2, '0') + '-' + 
      String(today.getDate()).padStart(2, '0')
    if (date < todayString) {
      return res.status(200).json({ availableSlots: [] })
    }

    const [year, month, day] = date.split('-').map(Number)
    const targetDate = new Date(year, month - 1, day)
    const dayOfWeek = targetDate.toLocaleDateString('en-US', { weekday: 'long' })
    if (!restaurant.operatingDays.includes(dayOfWeek)) {
      return res.status(200).json({ availableSlots: [] })
    }

    const existingBookings = await Booking.findAll({
      where: {
        bookingType: 'restaurant',
        bookableID: id,
        startDate: date,
        status: 'confirmed'
      }
    })
    const timeSlots = generateTimeSlots(restaurant.openTime, restaurant.closeTime)
    const availableSlots = []
    for (const time of timeSlots) {
      const slotBookings = existingBookings.filter(
        booking => booking.startTime === `${time}:00`
      )
      const totalBooked = slotBookings.reduce((sum, b) => sum + b.quantity, 0)
      const remainingCount = restaurant.maxCapacity - totalBooked
      if (remainingCount > 0) {
        availableSlots.push({ time, available: remainingCount })
      }
    }
    res.status(200).json({ availableSlots })
  } catch (error) {
    handleError(res, error, 'Could not fetch restaurant availability')
  }
}

const generateTimeSlots = (openTime, closeTime) => {
  const slots = []
  const open = new Date(`1970-01-01T${openTime}`)
  const close = new Date(`1970-01-01T${closeTime}`)
  let current = new Date(open)
  while (current < close) {
    slots.push(current.toTimeString().slice(0, 5))
    current.setHours(current.getHours() + 1)
  }
  return slots
}

module.exports = {
  getRestaurants,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
  getRestaurantAvailability
}