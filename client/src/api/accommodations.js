import sendRequest from './sendRequest'

const BASE_URL = '/api/accommodations'

export const getAccommodations = async () => {
  return sendRequest(BASE_URL, 'GET')
}

export const createAccommodation = async (accommodationData) => {
  return sendRequest(BASE_URL, 'POST', accommodationData)
}