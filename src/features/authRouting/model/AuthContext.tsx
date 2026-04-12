import { createContext, useCallback, useEffect, useState } from 'react'
import type { AuthContextType, User } from './types'
import { authApi } from './authApi'

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Initialize from localStorage
  useEffect(() => {
    const savedToken = localStorage.getItem('auth_token')

    if (savedToken) {
      setToken(savedToken)
      // Fetch user profile
      authApi
        .getProfile(savedToken)
        .then((data) => {
          setUser(data)
        })
        .catch((err) => {
          console.error('[AuthProvider Init] Failed to load profile:', err)
          // If token is invalid, clear it
          localStorage.removeItem('auth_token')
          setToken(null)
        })
        .finally(() => {
          setIsLoading(false)
        })
    } else {
      setIsLoading(false)
    }
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await authApi.login(email, password)

      const newToken = data.accessToken || data.token
      const userData = data.user


      setToken(newToken)
      setUser(userData)
      localStorage.setItem('auth_token', newToken)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed'
      console.error('[AuthContext] Login failed:', errorMessage)
      setError(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  const register = useCallback(async (email: string, password: string, name: string) => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await authApi.register(email, password, name)

      const newToken = data.accessToken || data.token
      const userData = data.user

      setToken(newToken)
      setUser(userData)
      localStorage.setItem('auth_token', newToken)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Registration failed'
      console.error('[AuthContext] Register failed:', errorMessage)
      setError(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setUser(null)
    setError(null)
    localStorage.removeItem('auth_token')
  }, [])

  const value: AuthContextType = {
    token,
    user,
    isLoading,
    error,
    login,
    register,
    logout,
    isAuthenticated: !!token,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
