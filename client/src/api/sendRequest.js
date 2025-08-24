export default async function sendRequest(url, method = 'GET', payload = null) {
  const options = { method }
  if (payload) {
    options.headers = { 'Content-Type': 'application/json' }
    options.body = JSON.stringify(payload)
    if (method === 'DELETE' || method === 'PUT') {
      url += `?_method=${method}`
    }
  }

  const token = getValidToken()
  if (token) {
    options.headers ||= {};
    options.headers.Authorization = `Bearer ${token}`
  }
  
  const res = await fetch(url, options);
  if (res.ok) return res.json()
  throw new Error('Bad Request')
}

const getValidToken = () => {
  const token = localStorage.getItem('token')
  if (!token) return null
  const payload = JSON.parse(atob(token.split('.')[1]))
  if (payload.exp * 1000 < Date.now()) {
    localStorage.removeItem('token')
    return null
  }
  return token
}