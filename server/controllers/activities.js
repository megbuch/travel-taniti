const Activity = require('../models/activity')
const Booking = require('../models/booking')
const { Op } = require('sequelize')
const { handleError } = require('../utils/errorHandler')

const getActivities = async (req, res) => {
  try {
    const { name } = req.query
    const whereClause = {}
    if (name) {
      whereClause.name = { [Op.iLike]: `%${name}%` }
    }
    const activities = await Activity.findAll({ where: whereClause })
    res.status(200).json({ activities })
  } catch (error) {
    handleError(res, error, 'Could not fetch activities')
  }
}

const createActivity = async (req, res) => {
  try {
    const activity = await Activity.create(req.body)
    res.status(201).json({ activity })
  } catch (error) {
    handleError(res, error, 'Could not create activity')
  }
}

const updateActivity = async (req, res) => {
  try {
    const { id } = req.params
    const activity = await Activity.findByPk(id)
    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' })
    }
    const updatedActivity = await activity.update(req.body)
    res.status(200).json({ activity: updatedActivity })
  } catch (error) {
    handleError(res, error, 'Could not update activity')
  }
}

const deleteActivity = async (req, res) => {
  try {
    const { id } = req.params
    const deletedCount = await Activity.destroy({ where: { id: id } })
    if (deletedCount === 0) {
      return res.status(404).json({ error: 'Activity not found' })
    }
    res.status(200).json({ message: 'Activity deleted' })
  } catch (error) {
    handleError(res, error, 'Could not delete activity')
  }
}

const getActivityAvailability = async (req, res) => {
  try {
    const { id } = req.params
    const { date } = req.query
    if (!date) {
      return res.status(400).json({ error: 'Date parameter is required' })
    }
    const activity = await Activity.findByPk(id)
    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' })
    }
    const today = new Date()
    const todayString = today.getFullYear() + '-' + 
      String(today.getMonth() + 1).padStart(2, '0') + '-' + 
      String(today.getDate()).padStart(2, '0')
    if (date < todayString) {
      return res.status(200).json({ availableSlots: [] })
    }
    let isActivityAvailable = false
    let activityTime = null
    if (activity.isRecurring) {
      const [year, month, day] = date.split('-').map(Number)
      const targetDate = new Date(Date.UTC(year, month - 1, day))
      const dayOfWeek = targetDate.toLocaleDateString('en-US', { weekday: 'long', timeZone: 'UTC' })
      const dayMatches = activity.recurringDays?.includes(dayOfWeek)
      const requestedDateStr = date
      const startDateStr = activity.recurringStartDate
      const endDateStr = activity.recurringEndDate
      const dateInRange =
        (!startDateStr || requestedDateStr >= startDateStr) &&
        (!endDateStr || requestedDateStr <= endDateStr)
      isActivityAvailable = dayMatches && dateInRange
      if (isActivityAvailable && activity.time) {
        activityTime = activity.time
      }
    } else {
      const activityDateString = activity.oneTimeDate
      isActivityAvailable = (activityDateString === date)
      if (isActivityAvailable && activity.time) {
        activityTime = activity.time
      }
    }
    if (!isActivityAvailable) {
      return res.status(200).json({ availableSlots: [] })
    }
    const existingBookings = await Booking.findAll({
      where: {
        bookingType: 'activity',
        bookableID: id,
        startDate: date,
        status: 'confirmed'
      }
    })
    const totalBooked = existingBookings.reduce((sum, b) => sum + b.quantity, 0)
    const remainingCount = activity.maxParticipants - totalBooked
    const availableSlots = []
    if (remainingCount > 0 && activityTime) {
      availableSlots.push({ time: activityTime, available: remainingCount })
    }
    res.status(200).json({ availableSlots })
  } catch (error) {
    handleError(res, error, 'Could not fetch activity availability')
  }
}

module.exports = {
  getActivities,
  createActivity,
  updateActivity,
  deleteActivity,
  getActivityAvailability
}