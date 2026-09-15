'use client'

import { createContext, useContext, type ReactNode } from 'react'
import { encerrarSessao } from '@/app/auth/actions'
import type { Usuario } from '@/lib/types'

interface AuthContextValue {
  usuario: Usuario | null
  sair: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children, usuario }: { children: ReactNode; usuario: Usuario | null }) {
  return (
    <AuthContext.Provider value={{ usuario, sair: encerrarSessao }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth deve ser usado dentro de AuthProvider')
  return context
}
