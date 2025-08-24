import { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const SessionContext = createContext()

export function SessionProvider({ children }) {
  const navigate = useNavigate()
  const [me, setMe] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)

  const Role = {
    ADMIN: 'admin',
    TRAVELER: 'traveler'
  }  

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    if (storedToken) setToken(storedToken)
    setLoading(false)
  }, [])

  useEffect(() => {
    if (token) localStorage.setItem('token', token)
    else localStorage.removeItem('token')
  }, [token])

  const signIn = (token, me) => {
    setToken(token)
    setMe(me)
    navigate(me.role == Role.ADMIN ? '/admin-dashboard' : '/traveler-dashboard')
  }

  const signOut = () => {
    setToken(null)
    setMe(null)
    navigate('/')
  }

  const value = {
    signIn,
    signOut,
    loading,
    me,
    isAuthenticated: !!token
  }

  return (
    <SessionContext.Provider value={value}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext)
  if (!context) return console.log('useSession should be used within a ModalProvider')
  return context
}