import sendRequest from './sendRequest'

const BASE_URL = '/api/bookings'

export const createBooking = async (bookingData) => {
  return sendRequest(BASE_URL, 'POST', bookingData)
}