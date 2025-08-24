export default function getToken() {
  const token = localStorage.getItem('token')
  if (!token) return null
  const payload = JSON.parse(atob(token.split(".")[1]))
  if (payload.exp * 1000 < Date.now()) {
    localStorage.removeItem('token')
    return null
  }
  return token
}