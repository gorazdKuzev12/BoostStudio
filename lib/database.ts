import { createClient } from './supabase'
import { Database } from './supabase'

type BusinessProfile = Database['public']['Tables']['business_profiles']['Row']
type MediaAsset = Database['public']['Tables']['media_assets']['Row']
type BusinessProfileInsert = Database['public']['Tables']['business_profiles']['Insert']
type BusinessProfileUpdate = Database['public']['Tables']['business_profiles']['Update']

class DatabaseService {
  private supabase = createClient()

  // Business Profile Operations
  async getUserBusinessProfile(userId: string): Promise<BusinessProfile | null> {
    try {
      const { data, error } = await this.supabase
        .from('business_profiles')
        .select('*')
        .eq('user_id', userId)
        .single()

      if (error) {
        console.error('Error fetching business profile:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Error fetching business profile:', error)
      return null
    }
  }

  async createBusinessProfile(profile: BusinessProfileInsert): Promise<BusinessProfile | null> {
    try {
      const { data, error } = await this.supabase
        .from('business_profiles')
        .insert(profile)
        .select()
        .single()

      if (error) {
        console.error('Error creating business profile:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Error creating business profile:', error)
      return null
    }
  }

  async updateBusinessProfile(
    userId: string, 
    updates: BusinessProfileUpdate
  ): Promise<BusinessProfile | null> {
    try {
      const { data, error } = await this.supabase
        .from('business_profiles')
        .update(updates)
        .eq('user_id', userId)
        .select()
        .single()

      if (error) {
        console.error('Error updating business profile:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Error updating business profile:', error)
      return null
    }
  }

  // Media Asset Operations
  async getUserMediaAssets(userId: string): Promise<MediaAsset[]> {
    try {
      const { data, error } = await this.supabase
        .from('media_assets')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching media assets:', error)
        return []
      }

      return data || []
    } catch (error) {
      console.error('Error fetching media assets:', error)
      return []
    }
  }

  async getBusinessProfileMediaAssets(businessProfileId: string): Promise<MediaAsset[]> {
    try {
      const { data, error } = await this.supabase
        .from('media_assets')
        .select('*')
        .eq('business_profile_id', businessProfileId)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching business profile media assets:', error)
        return []
      }

      return data || []
    } catch (error) {
      console.error('Error fetching business profile media assets:', error)
      return []
    }
  }

  async uploadFile(file: File, userId: string): Promise<string | null> {
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${userId}/${Date.now()}.${fileExt}`

      const { data, error } = await this.supabase.storage
        .from('media-assets')
        .upload(fileName, file)

      if (error) {
        console.error('Error uploading file:', error)
        return null
      }

      const { data: { publicUrl } } = this.supabase.storage
        .from('media-assets')
        .getPublicUrl(data.path)

      return publicUrl
    } catch (error) {
      console.error('Error uploading file:', error)
      return null
    }
  }

  async createMediaAsset(
    userId: string,
    file: File,
    businessProfileId?: string
  ): Promise<MediaAsset | null> {
    try {
      // First upload the file
      const fileUrl = await this.uploadFile(file, userId)
      
      if (!fileUrl) {
        return null
      }

      // Then create the media asset record
      const { data, error } = await this.supabase
        .from('media_assets')
        .insert({
          user_id: userId,
          business_profile_id: businessProfileId || null,
          file_name: file.name,
          file_type: file.type,
          file_size: file.size,
          file_url: fileUrl,
        })
        .select()
        .single()

      if (error) {
        console.error('Error creating media asset:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Error creating media asset:', error)
      return null
    }
  }
}

export const databaseService = new DatabaseService()

// Export types for use in components
export type { BusinessProfile, MediaAsset, BusinessProfileInsert, BusinessProfileUpdate } 