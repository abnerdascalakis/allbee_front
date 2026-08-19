'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'

interface Usuario {
  nome: string
  email: string
  perfil: 'cliente' | 'administrador'
}

interface AuthContextValue {
  usuario: Usuario | null
  sair: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null)

  return (
    <AuthContext.Provider value={{ usuario, sair: () => setUsuario(null) }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth deve ser usado dentro de AuthProvider')
  return context
}
