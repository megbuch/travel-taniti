import * as usersAPI from "../api/users";

export const createUser = async (userData) => {
  const response = await usersAPI.createUser(userData);
  localStorage.setItem("token", response.accessToken);
  return response
}