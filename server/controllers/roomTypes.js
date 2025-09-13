const RoomType = require('../models/roomType')
const { handleError } = require('../utils/errorHandler')

const createRoomType = async (req, res) => {
  try {
    const roomType = await RoomType.create(req.body)
    res.status(201).json({ roomType })
  } catch (error) {
    handleError(res, error, 'Could not create room type')
  }
}

const deleteRoomType = async (req, res) => {
  try {
    const { id } = req.params
    const deletedCount = await RoomType.destroy({ where: { id: id } })
    if (deletedCount === 0) {
      return res.status(404).json({ error: 'Room type not found' })
    }
    res.status(200).json({ message: 'Room type deleted' })
  } catch (error) {
    handleError(res, error, 'Could not delete room type')
  }
}

module.exports = {
  createRoomType,
  deleteRoomType
}