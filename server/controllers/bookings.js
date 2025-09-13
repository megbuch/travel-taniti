const Booking = require('../models/booking')
const Accommodation = require('../models/accommodation')
const Restaurant = require('../models/restaurant')
const Activity = require('../models/activity')
const { handleError } = require('../utils/errorHandler')

const getBookings = async (req, res) => {
  try {
    await updateCompletedBookings(req.user.id)
    const bookings = await Booking.findAll({ where: { userID: req.user.id } })
    const accommodationIDs = []
    const restaurantIDs = []
    const activityIDs = []
    bookings.forEach(booking => {
      switch (booking.bookingType) {
        case 'accommodation':
          accommodationIDs.push(booking.bookableID)
          break
        case 'restaurant':
          restaurantIDs.push(booking.bookableID)
          break
        case 'activity':
          activityIDs.push(booking.bookableID)
          break
      }
    })
    const [accommodations, restaurants, activities] = await Promise.all([
      accommodationIDs.length ? Accommodation.findAll({ where: { id: accommodationIDs } }) : [],
      restaurantIDs.length ? Restaurant.findAll({ where: { id: restaurantIDs } }) : [],
      activityIDs.length ? Activity.findAll({ where: { id: activityIDs } }) : []
    ])
    const lookups = {
      accommodation: Object.fromEntries(accommodations.map(a => [a.id, a])),
      restaurant: Object.fromEntries(restaurants.map(r => [r.id, r])),
      activity: Object.fromEntries(activities.map(a => [a.id, a]))
    }
    const bookingsWithDetails = bookings.map(booking => ({
      ...booking.toJSON(),
      bookableDetails: lookups[booking.bookingType]?.[booking.bookableID]
    }))
    res.status(200).json({ bookings: bookingsWithDetails })
  } catch (error) {
    handleError(res, error, 'Could not fetch bookings')
  }
}

const getBooking = async (req, res) => {
  try {
    await updateCompletedBookings(req.user.id)
    const { id } = req.params
    const booking = await Booking.findByPk(id)
    let bookableDetails = null
    switch (booking.bookingType) {
      case 'accommodation':
        bookableDetails = await Accommodation.findByPk(booking.bookableID)
        break
      case 'restaurant':
        bookableDetails = await Restaurant.findByPk(booking.bookableID)
        break
      case 'activity':
        bookableDetails = await Activity.findByPk(booking.bookableID)
        break
    }
    const bookingWithDetails = { ...booking.toJSON(), bookableDetails }
    res.status(200).json({ booking: bookingWithDetails })
  } catch (error) {
    handleError(res, error, 'Could not fetch booking')
  }
}

const createBooking = async (req, res) => {
  try {
    if ('userID' in req.body) {
      return res.status(400).json({ error: 'User cannot be specified' })
    }
    if ('status' in req.body) {
      return res.status(400).json({ error: 'Status cannot be specified' })
    }
    const existingBooking = await Booking.findOne({
      where: {
        userID: req.user.id,
        bookableID: req.body.bookableID,
        bookingType: req.body.bookingType
      }
    })
    if (existingBooking) {
      return res.status(409).json({ 
        error: 'There is already an existing booking for this service' 
      })
    }
    const data = { ...req.body, userID: req.user.id }
    const booking = await Booking.create(data)
    let bookableDetails = null
    switch (booking.bookingType) {
      case 'accommodation':
        bookableDetails = await Accommodation.findByPk(booking.bookableID)
        break
      case 'restaurant':
        bookableDetails = await Restaurant.findByPk(booking.bookableID)
        break
      case 'activity':
        bookableDetails = await Activity.findByPk(booking.bookableID)
        break
    }
    const bookingWithDetails = { ...booking.toJSON(), bookableDetails }
    res.status(201).json({ bookingWithDetails })
  } catch (error) {
    handleError(res, error, 'Could not create booking')
  }
}

// Only status can be updated
const updateBooking = async (req, res) => {
  try {
    const { status } = req.body
    if (Object.keys(req.body).length !== 1 || !status) {
      return res.status(400).json({ error: 'Only status field can be updated' })
    }
    if (!['confirmed', 'pendingCancellation'].includes(status)) {
      return res.status(400).json({ error: 'Status can only be "confirmed" or "pendingCancellation"' })
    }
    const { id } = req.params
    const booking = await Booking.findOne({ where: { id: id, userID: req.user.id } })
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' })
    }
    const updatedBooking = await booking.update({ status })
    res.status(200).json({ booking: updatedBooking })
  } catch (error) {
    handleError(res, error, 'Could not update booking')
  }
}

const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params
    const deletedCount = await Booking.destroy({ where: { id: id, userID: user.id } })
    if (deletedCount === 0)  {
      return res.status(404).json({ error: 'Booking not found' })
    }
    res.status(200).json({ message: 'Booking deleted' })
  } catch (error) {
    handleError(res, error, 'Could not delete booking')
  }
}

const updateCompletedBookings = async (userID) => {
  await Booking.update(
    { status: 'completed' },
    {
      where: {
        userID: userID,
        status: 'confirmed',
        endDate: { [Op.lt]: new Date() }
      }
    }
  )
}

module.exports = {
  getBookings,
  getBooking,
  createBooking,
  updateBooking,
  deleteBooking
}