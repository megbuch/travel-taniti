import sendRequest from './sendRequest'

const BASE_URL = '/api/activities'

export const getActivities = async (query) => {
  return sendRequest(BASE_URL, 'GET', null, query)
}

export const createActivity = async (activityData) => {
  return sendRequest(BASE_URL, 'POST', activityData)
}

export const updateActivity = async (activityID, activityData) => {
  return sendRequest(`${BASE_URL}/${activityID}`, 'PUT', activityData)
}

export const deleteActivity = async (activityID) => {
  return sendRequest(`${BASE_URL}/${activityID}`, 'DELETE')
}

export const getActivityAvailability = async (activityID, query) => {
  return sendRequest(`${BASE_URL}/${activityID}/availability`, 'GET', null, query)
}