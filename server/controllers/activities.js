const Activity = require('../models/activity')
const { handleError } = require('../utils/errorHandler')

const getActivities = async (req, res) => {
  try {
    const activities = await Activity.findAll()
    for (const activity of activities) {
      activity.dataValues.roomTypes = await RoomType.findAll({ 
        where: { accommodationID: activity.id } 
      })
    }
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
    const updatedAccommodation = await activity.update(req.body)
    res.status(200).json({ activity: updatedAccommodation })
  } catch (error) {
    handleError(res, error, 'Could not update activity')
  }
}

const deleteActivity = async (req, res) => {
  try {
    const { id } = req.params
    const deletedCount = await Activity.destroy({ where: { id } })
    if (deletedCount === 0) {
      return res.status(404).json({ error: 'Activity not found' })
    }
    res.status(200).json({ message: 'Activity deleted' })
  } catch (error) {
    handleError(res, error, 'Could not delete activity')
  }
}

module.exports = {
  getActivities,
  createActivity,
  updateActivity,
  deleteActivity
}