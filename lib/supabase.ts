import { createBrowserClient } from '@supabase/ssr'

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      business_profiles: {
        Row: {
          id: string
          user_id: string
          business_name: string | null
          business_type: string | null
          description: string | null
          website: string | null
          logo_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          business_name?: string | null
          business_type?: string | null
          description?: string | null
          website?: string | null
          logo_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          business_name?: string | null
          business_type?: string | null
          description?: string | null
          website?: string | null
          logo_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      media_assets: {
        Row: {
          id: string
          user_id: string
          business_profile_id: string | null
          file_name: string
          file_type: string
          file_size: number
          file_url: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          business_profile_id?: string | null
          file_name: string
          file_type: string
          file_size: number
          file_url: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          business_profile_id?: string | null
          file_name?: string
          file_type?: string
          file_size?: number
          file_url?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
} 