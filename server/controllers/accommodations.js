const Accommodation = require('../models/accommodation')
const { handleError } = require('../utils/errorHandler')

const createAccommodation = async (req, res) => {
  try {
    const accommodation = await Accommodation.create(req.body)
    
    res.status(201).json({ accommodation })
  } catch (error) {
    handleError(res, error, 'Could not create accommodation')
  }
}

const getAccommodations = async (req, res) => {
  try {
    const accommodations = await Accommodation.findAll()
    res.status(200).json({ accommodations })
  } catch (error) {
    handleError(res, error, 'Could not fetch accommodations')
  }
}

module.exports = {
  createAccommodation,
  getAccommodations
}