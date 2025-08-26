const Accommodation = require('../models/accommodation')
const RoomType = require('../models/roomType')
const { handleError } = require('../utils/errorHandler')

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

const getAccommodations = async (req, res) => {
  try {
    const accommodations = await Accommodation.findAll()
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

module.exports = {
  createAccommodation,
  updateAccommodation,
  getAccommodations
}