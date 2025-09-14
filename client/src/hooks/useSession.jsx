import { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const SessionContext = createContext()

export function SessionProvider({ children }) {
  const navigate = useNavigate()
  const [me, setMe] = useState(null)
  const [token, setToken] = useState(null)

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    if (storedToken) {
      try {
        const payload = JSON.parse(atob(storedToken.split('.')[1]))
        if (payload.exp * 1000 <= Date.now()) {
          localStorage.removeItem('token')
          return
        }
        setToken(storedToken)
        const userData = {
          id: payload.userID,
          email: payload.email,
          firstName: payload.firstName,
          lastName: payload.lastName,
          role: payload.role
        }
        setMe(userData)
      } catch (error) {
        localStorage.removeItem('token')
      }
    }
  }, [])

  useEffect(() => {
    if (token) localStorage.setItem('token', token)
    else localStorage.removeItem('token')
  }, [token])

  const signIn = (token, me) => {
    setToken(token)
    setMe(me)
  }

  const signOut = () => {
    setToken(null)
    setMe(null)
    navigate('/')
  }

  const value = {
    signIn,
    signOut,
    me,
    isAuthenticated: !!token && !!me
  }

  return (
    <SessionContext.Provider value={value}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext)
  if (!context) return
  return context
}