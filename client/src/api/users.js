import sendRequest from './sendRequest'
const BASE_URL = '/api/users'

export const createUser = userData => {
  return sendRequest(BASE_URL, 'POST', userData)
}