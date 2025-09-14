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
    const [year, month, day] = date.split('-').map(Number)
    const requestedDate = new Date(year, month - 1, day)
    const dayOfWeek = requestedDate.toLocaleDateString('en-US', { weekday: 'long' })
    let isActivityAvailable = false
    let activityTime = null
    if (activity.isRecurring) {
      const dayMatches = activity.recurringDays && activity.recurringDays.includes(dayOfWeek)
      const startDate = activity.recurringStartDate ? new Date(activity.recurringStartDate) : null
      const endDate = activity.recurringEndDate ? new Date(activity.recurringEndDate) : null
      const dateInRange = (!startDate || requestedDate >= startDate) && (!endDate || requestedDate <= endDate)
      isActivityAvailable = dayMatches && dateInRange
      activityTime = activity.recurringTime
    } else {
      const activityDate = new Date(activity.oneTimeDate)
      const activityDateOnly = new Date(activityDate.getFullYear(), activityDate.getMonth(), activityDate.getDate())
      const requestedDateOnly = new Date(requestedDate.getFullYear(), requestedDate.getMonth(), requestedDate.getDate())
      isActivityAvailable = activityDateOnly.getTime() === requestedDateOnly.getTime()
      if (isActivityAvailable) {
        activityTime = activityDate.toTimeString().slice(0, 5)
      }
    }
    if (!isActivityAvailable) {
      return res.status(200).json({ availableSlots: [] })
    }
    const existingBookings = await Booking.findAll({
      where: {
        bookingType: 'activity',
        bookableID: id,
        startDate: { [Op.between]: [new Date(`${date}T00:00:00`), new Date(`${date}T23:59:59`)] },
        status: 'confirmed'
      }
    })
    const totalBooked = existingBookings.reduce((sum, booking) => sum + booking.quantity, 0)
    const remainingCount = activity.maxParticipants - totalBooked
    const availableSlots = []
    if (remainingCount > 0) {
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