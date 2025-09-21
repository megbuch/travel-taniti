import sendRequest from './sendRequest'

const BASE_URL = '/api/bookings'

export const getBookings = async () => {
  return sendRequest(BASE_URL, 'GET')
}

export const createBooking = async (bookingData) => {
  return sendRequest(BASE_URL, 'POST', bookingData)
}

export const updateBooking = async (bookingID, bookingData) => {
  return sendRequest(`${BASE_URL}/${bookingID}`, 'PUT', bookingData)
}

export const deleteBooking = async (bookingID) => {
  return sendRequest(`${BASE_URL}/${bookingID}`, 'DELETE')
}