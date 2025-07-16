import { Database } from '../lib/supabase'

// Re-export database types for convenience
export type { Database }

// Extract table types
export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type Inserts<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type Updates<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update']

// Specific table types
export type BusinessProfile = Tables<'business_profiles'>
export type MediaAsset = Tables<'media_assets'>

// Insert types
export type BusinessProfileInsert = Inserts<'business_profiles'>
export type MediaAssetInsert = Inserts<'media_assets'>

// Update types
export type BusinessProfileUpdate = Updates<'business_profiles'>
export type MediaAssetUpdate = Updates<'media_assets'>

// Custom types for API responses
export interface ApiResponse<T> {
  data: T | null
  error: string | null
  success: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  count: number
  page: number
  limit: number
  totalPages: number
}

// Auth types
export interface AuthUser {
  id: string
  email: string
  email_confirmed_at: string | null
  last_sign_in_at: string | null
  created_at: string
  updated_at: string
}

export interface SignUpPayload {
  email: string
  password: string
  businessName?: string
  businessType?: string
}

export interface LoginPayload {
  email: string
  password: string
}

// File upload types
export interface FileUploadResult {
  url: string | null
  error: string | null
}

export interface MediaAssetWithProfile extends MediaAsset {
  business_profile?: BusinessProfile
}

// Business types enum
export type BusinessType = 
  | 'restaurant'
  | 'retail'
  | 'service'
  | 'technology'
  | 'healthcare'
  | 'other'

// File types
export type SupportedFileType = 
  | 'image/jpeg'
  | 'image/png'
  | 'image/gif'
  | 'image/webp'
  | 'video/mp4'
  | 'video/webm'
  | 'video/ogg'

export const SUPPORTED_FILE_TYPES: SupportedFileType[] = [
  'image/jpeg',
  'image/png', 
  'image/gif',
  'image/webp',
  'video/mp4',
  'video/webm',
  'video/ogg'
]

export const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB 