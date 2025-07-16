import { useState, useEffect } from 'react'
import { User, AuthChangeEvent, Session } from '@supabase/supabase-js'
import { createClient } from '../lib/supabase'
import { authService } from '../lib/auth'

export interface UseUserReturn {
  user: User | null
  loading: boolean
  error: string | null
}

export function useUser(): UseUserReturn {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  useEffect(() => {
    let mounted = true

    async function getInitialSession() {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('Error getting session:', error)
          setError(error.message)
        } else if (mounted) {
          setUser(session?.user ?? null)
          
          // Handle OAuth user profile creation if needed
          if (session?.user) {
            await authService.handleOAuthUser(session.user)
          }
        }
      } catch (err) {
        console.error('Error in getInitialSession:', err)
        setError('Failed to get user session')
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    getInitialSession()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event: AuthChangeEvent, session: Session | null) => {
        if (mounted) {
          setUser(session?.user ?? null)
          setLoading(false)
          setError(null)

          // Handle OAuth user profile creation for sign_in events
          if (event === 'SIGNED_IN' && session?.user) {
            await authService.handleOAuthUser(session.user)
          }
        }
      }
    )

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [supabase.auth])

  return { user, loading, error }
} 