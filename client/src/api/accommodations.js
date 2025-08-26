import sendRequest from './sendRequest'

const BASE_URL = '/api/accommodations'

export const getAccommodations = async () => {
  return sendRequest(BASE_URL, 'GET')
}

export const createAccommodation = async (accommodationData) => {
  return sendRequest(BASE_URL, 'POST', accommodationData)
}

export const updateAccommodation = async (accommodationID, accommodationData) => {
  return sendRequest(`${BASE_URL}/${accommodationID}`, 'PUT', accommodationData)
}

export const deleteAccommodation = async (accommodationID) => {
  return sendRequest(`${BASE_URL}/${accommodationID}`, 'DELETE')
}