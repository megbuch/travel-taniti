const Accommodation = require('../models/accommodation')
const RoomType = require('../models/roomType')
const Booking = require('../models/booking')
const { Op } = require('sequelize')
const { handleError } = require('../utils/errorHandler')

const getAccommodations = async (req, res) => {
  try {
    const { name } = req.query
    const whereClause = {}
    if (name) {
      whereClause.name = { [Op.iLike]: `%${name}%` }
    }
    const accommodations = await Accommodation.findAll({ where: whereClause });
    for (const accommodation of accommodations) {
      accommodation.dataValues.roomTypes = await RoomType.findAll({ 
        where: { accommodationID: accommodation.id } 
      })
    }
    res.status(200).json({ accommodations })
  } catch (error) {
    handleError(res, error, 'Could not fetch accommodations')
  }
}

const getAccommodation = async (req, res) => {
  try {
    const { id } = req.params
    const accommodation = await Accommodation.findByPk(id)
    if (!accommodation) {
      return res.status(404).json({ error: 'Accommodation not found' })
    }
    accommodation.dataValues.roomTypes = await RoomType.findAll({ 
      where: { accommodationID: accommodation.id } 
    })
    res.status(200).json({ accommodation })
  } catch (error) {
    handleError(res, error, 'Could not fetch accommodations')
  }
}

const createAccommodation = async (req, res) => {
  try {
    const accommodation = await Accommodation.create(req.body)
    res.status(201).json({ accommodation })
  } catch (error) {
    handleError(res, error, 'Could not create accommodation')
  }
}

const updateAccommodation = async (req, res) => {
  try {
    const { id } = req.params
    const accommodation = await Accommodation.findByPk(id)
    if (!accommodation) {
      return res.status(404).json({ error: 'Accommodation not found' })
    }
    const updatedAccommodation = await accommodation.update(req.body)
    res.status(200).json({ accommodation: updatedAccommodation })
  } catch (error) {
    handleError(res, error, 'Could not update accommodation')
  }
}

const deleteAccommodation = async (req, res) => {
  try {
    const { id } = req.params
    const deletedCount = await Accommodation.destroy({ where: { id: id } })
    if (deletedCount === 0) {
      return res.status(404).json({ error: 'Accommodation not found' })
    }
    res.status(200).json({ message: 'Accommodation deleted' })
  } catch (error) {
    handleError(res, error, 'Could not delete accommodation')
  }
}

const getAccommodationAvailability = async (req, res) => {
  try {
    const { id } = req.params
    const { startDate, endDate } = req.query
    if (!startDate || !endDate) {
      return res.status(400).json({ error: 'Start date and end date are required' })
    }
    const start = new Date(startDate)
    const end = new Date(endDate)
    if (start >= end) {
      return res.status(400).json({ error: 'End date must be after start date' })
    }
    const accommodation = await Accommodation.findByPk(id)
    if (!accommodation) {
      return res.status(404).json({ error: 'Accommodation not found' })
    }
    const existingBookings = await Booking.findAll({
      where: {
        bookingType: 'accommodation',
        bookableID: id,
        status: 'confirmed',
        [Op.and]: [
          { startDate: { [Op.lt]: end } },
          { endDate: { [Op.gt]: start } }
        ]
      }
    })
    const roomTypes = await RoomType.findAll({ where: { accommodationID: id } })
    const availableRoomTypes = []
    for (const roomType of roomTypes) {
      const roomTypeBookings = existingBookings.filter(booking => booking.roomTypeID === roomType.id)
      const totalBooked = roomTypeBookings.reduce((sum, booking) => sum + booking.quantity, 0)
      const remainingCount = roomType.totalRooms - totalBooked
      if (remainingCount > 0) {
        availableRoomTypes.push({ roomType, available: remainingCount })
      }
    }
    res.status(200).json({ availableRoomTypes })
  } catch (error) {
    handleError(res, error, 'Could not fetch accommodation availability')
  }
}

module.exports = {
  getAccommodations,
  getAccommodation,
  createAccommodation,
  updateAccommodation,
  deleteAccommodation,
  getAccommodationAvailability
}