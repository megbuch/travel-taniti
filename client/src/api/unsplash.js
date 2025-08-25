import sendRequest from './sendRequest'

const BASE_URL = '/api/unsplash'

export const searchForImages = async (query) => {
  return sendRequest(`${BASE_URL}/search`, 'POST', {
    query,
    per_page: 12,
    orientation: 'landscape'
  })
}