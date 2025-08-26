import sendRequest from './sendRequest'

const BASE_URL = '/api/restaurants'

export const getRestaurants = async () => {
  return sendRequest(BASE_URL, 'GET')
}

export const createRestaurant = async (restaurantData) => {
  return sendRequest(BASE_URL, 'POST', restaurantData)
}

export const updateRestaurant = async (restaurantID, restaurantData) => {
  return sendRequest(`${BASE_URL}/${restaurantID}`, 'PUT', restaurantData)
}

export const deleteRestaurant = async (restaurantID) => {
  return sendRequest(`${BASE_URL}/${restaurantID}`, 'DELETE')
}