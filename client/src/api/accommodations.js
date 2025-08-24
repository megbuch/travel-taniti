import sendRequest from './sendRequest'

const BASE_URL = '/api/accommodations'

export const getAccommodations = async () => {
  return sendRequest(BASE_URL, 'GET')
}