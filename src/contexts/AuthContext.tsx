'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/client'
import { authService, SignInData, SignUpData } from '@/services/authService'

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  signIn: (data: SignInData) => Promise<{ error?: string }>
  signUp: (data: SignUpData) => Promise<{ error?: string }>
  signOut: () => Promise<{ error?: string }>
  updatePassword: (newPassword: string) => Promise<{ error?: string }>
  resetPassword: (email: string) => Promise<{ error?: string }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  
  const supabase = createClient()

  useEffect(() => {
    // Lấy session hiện tại
    const getSession = async () => {
      const result = await authService.getCurrentSession()
      if (!result.error && result.session) {
        setSession(result.session)
        setUser(result.session.user)
      }
      setLoading(false)
    }

    getSession()

    // Lắng nghe thay đổi auth state
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session)
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async (data: SignInData) => {
    const result = await authService.signIn(data)
    return { error: result.error }
  }

  const signUp = async (data: SignUpData) => {
    const result = await authService.signUp(data)
    return { error: result.error }
  }

  const signOut = async () => {
    return await authService.signOut()
  }

  const updatePassword = async (newPassword: string) => {
    return await authService.updatePassword(newPassword)
  }

  const resetPassword = async (email: string) => {
    return await authService.resetPassword(email)
  }

  return (
    <AuthContext.Provider value={{
      user,
      session,
      loading,
      signIn,
      signUp,
      signOut,
      updatePassword,
      resetPassword,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
