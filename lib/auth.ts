import { createClient } from './supabase'
import { AuthError, User, Provider } from '@supabase/supabase-js'

export interface AuthResult {
  user: User | null
  error: AuthError | null
}

export interface SignUpData {
  email: string
  password: string
  businessName?: string
  businessType?: string
}

export interface LoginData {
  email: string
  password: string
}

class AuthService {
  private supabase = createClient()

  async signUp({ email, password, businessName, businessType }: SignUpData): Promise<AuthResult> {
    try {
      const { data, error } = await this.supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            business_name: businessName,
            business_type: businessType,
          },
        },
      })

      if (error) {
        return { user: null, error }
      }

      // If user is successfully created, create business profile
      if (data.user && !data.user.identities?.length) {
        // Only create business profile for email signups, not OAuth
        await this.createBusinessProfile(data.user.id, businessName, businessType)
      }

      return { user: data.user, error: null }
    } catch (error) {
      return { 
        user: null, 
        error: error as AuthError 
      }
    }
  }

  async login({ email, password }: LoginData): Promise<AuthResult> {
    try {
      const { data, error } = await this.supabase.auth.signInWithPassword({
        email,
        password,
      })

      return { user: data.user, error }
    } catch (error) {
      return { 
        user: null, 
        error: error as AuthError 
      }
    }
  }

  async signInWithProvider(provider: Provider): Promise<{ error: AuthError | null }> {
    try {
      const { error } = await this.supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      })

      return { error }
    } catch (error) {
      return { error: error as AuthError }
    }
  }

  async signInWithGoogle(): Promise<{ error: AuthError | null }> {
    return this.signInWithProvider('google')
  }

  async signInWithApple(): Promise<{ error: AuthError | null }> {
    return this.signInWithProvider('apple')
  }

  async logout(): Promise<{ error: AuthError | null }> {
    try {
      const { error } = await this.supabase.auth.signOut()
      return { error }
    } catch (error) {
      return { error: error as AuthError }
    }
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const { data: { user } } = await this.supabase.auth.getUser()
      return user
    } catch (error) {
      console.error('Error getting current user:', error)
      return null
    }
  }

  async resetPassword(email: string): Promise<{ error: AuthError | null }> {
    try {
      const { error } = await this.supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })
      return { error }
    } catch (error) {
      return { error: error as AuthError }
    }
  }

  private async createBusinessProfile(
    userId: string, 
    businessName?: string, 
    businessType?: string
  ): Promise<void> {
    try {
      const { error } = await this.supabase
        .from('business_profiles')
        .insert({
          user_id: userId,
          business_name: businessName || null,
          business_type: businessType || null,
        })

      if (error) {
        console.error('Error creating business profile:', error)
      }
    } catch (error) {
      console.error('Error creating business profile:', error)
    }
  }

  // Handle OAuth user profile creation after successful login
  async handleOAuthUser(user: User): Promise<void> {
    try {
      // Check if business profile already exists
      const { data: existingProfile } = await this.supabase
        .from('business_profiles')
        .select('id')
        .eq('user_id', user.id)
        .single()

      // Create business profile if it doesn't exist
      if (!existingProfile) {
        await this.createBusinessProfile(
          user.id,
          user.user_metadata?.full_name || user.user_metadata?.name,
          'other' // Default business type for OAuth users
        )
      }
    } catch (error) {
      console.error('Error handling OAuth user:', error)
    }
  }

  // Get auth state change subscription
  onAuthStateChange(callback: (event: string, session: any) => void) {
    return this.supabase.auth.onAuthStateChange(callback)
  }
}

export const authService = new AuthService() 