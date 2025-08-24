import sendRequest from './sendRequest'

const BASE_URL = '/api/authentications'

export const createAuthentication = async (userData) => {
  return sendRequest(BASE_URL, 'POST', userData)
}