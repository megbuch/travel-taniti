import sendRequest from './sendRequest'

const BASE_URL = '/api/accommodations'

export const getAccommodations = async (query) => {
  return sendRequest(BASE_URL, 'GET', null, query);
}

export const getAccommodation = async (accommodationID) => {
  return sendRequest(`${BASE_URL}/${accommodationID}`, 'GET');
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

export const getAccommodationAvailability = async (accommodationID, query) => {
  return sendRequest(`${BASE_URL}/${accommodationID}/availability`, 'GET', null, query)
}