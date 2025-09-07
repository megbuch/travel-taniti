import sendRequest from './sendRequest'

const BASE_URL = '/api/roomTypes'

export const createRoomType = async (roomTypeData) => {
  return sendRequest(BASE_URL, 'POST', roomTypeData)
}

export const deleteRoomType = async (roomTypeID) => {
  return sendRequest(`${BASE_URL}/${roomTypeID}`, 'DELETE')
}