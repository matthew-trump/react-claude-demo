import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState(() => {
    // Initialize from localStorage
    return localStorage.getItem('username') || null
  })

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Initialize from localStorage
    return localStorage.getItem('isLoggedIn') === 'true'
  })

  // Persist to localStorage whenever auth state changes
  useEffect(() => {
    if (isLoggedIn && username) {
      localStorage.setItem('username', username)
      localStorage.setItem('isLoggedIn', 'true')
    } else {
      localStorage.removeItem('username')
      localStorage.removeItem('isLoggedIn')
    }
  }, [username, isLoggedIn])

  const login = (user) => {
    setUsername(user)
    setIsLoggedIn(true)
  }

  const logout = () => {
    setUsername(null)
    setIsLoggedIn(false)
  }

  return (
    <AuthContext.Provider value={{ username, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
