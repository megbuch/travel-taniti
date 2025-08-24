const RoomType = require('../models/roomType')

const create = async (req, res) => {
  try {
    const roomType = await RoomType.create(req.body)
    res.status(201).json({ roomType })
  } catch (error) {
    console.log(error)
    return res.status(400).json({ error: 'Could not create room type' })
  }
}

module.exports = {
  create
}