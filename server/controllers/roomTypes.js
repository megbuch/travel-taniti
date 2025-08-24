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

module.exports = {
  createRoomType
}