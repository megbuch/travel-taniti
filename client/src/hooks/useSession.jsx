import { createContext, useContext, useState, useEffect } from 'react'

const SessionContext = createContext()

export function SessionProvider({ children }) {
  const [me, setMe] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)

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
  }

  const signOut = () => {
    setToken(null)
    setMe(null)
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