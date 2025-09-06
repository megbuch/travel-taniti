import sendRequest from './sendRequest'

const BASE_URL = '/api/users'

export const getUsers = async (query) => {
  return sendRequest(BASE_URL, 'GET', null, query)
}

export const createUser = async (userData) => {
  return sendRequest(BASE_URL, 'POST', userData)
}
