'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'

interface User {
  name: string
  email: string
  role: 'customer' | 'admin'
}

interface AuthContextValue {
  user: User | null
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  return (
    <AuthContext.Provider value={{ user, logout: () => setUser(null) }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth deve ser usado dentro de AuthProvider')
  return context
}
