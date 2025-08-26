import sendRequest from './sendRequest'

const BASE_URL = '/api/users'

export const getUsers = async () => {
  return sendRequest(BASE_URL, 'GET')
}

export const createUser = async (userData) => {
  return sendRequest(BASE_URL, 'POST', userData)
}
