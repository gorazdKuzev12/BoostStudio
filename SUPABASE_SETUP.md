# Supabase Setup Guide

This guide will help you set up Supabase authentication and database integration with your Next.js app.

## Prerequisites

1. A Supabase account and project
2. Node.js and npm installed
3. Your Supabase URL and anon key

## Environment Variables

Create a `.env.local` file in your project root with the following variables:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

**Example:**
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

You can find these values in your Supabase project dashboard under Settings > API.

## Database Schema

Create the following tables in your Supabase database using the SQL editor:

### 1. Business Profiles Table

```sql
-- Create business_profiles table
CREATE TABLE business_profiles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    business_name TEXT,
    business_type TEXT,
    description TEXT,
    website TEXT,
    logo_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Add RLS policies
ALTER TABLE business_profiles ENABLE ROW LEVEL SECURITY;

-- Users can only see their own business profiles
CREATE POLICY "Users can view own business profile" ON business_profiles
    FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own business profile
CREATE POLICY "Users can insert own business profile" ON business_profiles
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own business profile
CREATE POLICY "Users can update own business profile" ON business_profiles
    FOR UPDATE USING (auth.uid() = user_id);

-- Users can delete their own business profile
CREATE POLICY "Users can delete own business profile" ON business_profiles
    FOR DELETE USING (auth.uid() = user_id);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_business_profiles_updated_at BEFORE UPDATE
    ON business_profiles FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
```

### 2. Media Assets Table

```sql
-- Create media_assets table
CREATE TABLE media_assets (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    business_profile_id UUID REFERENCES business_profiles(id) ON DELETE SET NULL,
    file_name TEXT NOT NULL,
    file_type TEXT NOT NULL,
    file_size INTEGER NOT NULL,
    file_url TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Add RLS policies
ALTER TABLE media_assets ENABLE ROW LEVEL SECURITY;

-- Users can only see their own media assets
CREATE POLICY "Users can view own media assets" ON media_assets
    FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own media assets
CREATE POLICY "Users can insert own media assets" ON media_assets
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own media assets
CREATE POLICY "Users can update own media assets" ON media_assets
    FOR UPDATE USING (auth.uid() = user_id);

-- Users can delete their own media assets
CREATE POLICY "Users can delete own media assets" ON media_assets
    FOR DELETE USING (auth.uid() = user_id);
```

### 3. Storage Bucket (Optional)

If you want to store files in Supabase Storage:

```sql
-- Create a storage bucket for media assets
INSERT INTO storage.buckets (id, name, public) 
VALUES ('media-assets', 'media-assets', true);

-- Set up RLS policies for storage
CREATE POLICY "Users can upload own files" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'media-assets' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view own files" ON storage.objects
    FOR SELECT USING (bucket_id = 'media-assets' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete own files" ON storage.objects
    FOR DELETE USING (bucket_id = 'media-assets' AND auth.uid()::text = (storage.foldername(name))[1]);
```

## Authentication Configuration

In your Supabase dashboard:

1. Go to **Authentication > Settings**
2. Configure your site URL (e.g., `http://localhost:3000` for development)
3. Add any additional redirect URLs if needed
4. Configure email templates if desired

## OAuth Setup (Google, Apple, etc.)

**🔗 For detailed OAuth setup instructions, see [SUPABASE_OAUTH_SETUP.md](./SUPABASE_OAUTH_SETUP.md)**

This includes:
- Google OAuth configuration
- Apple OAuth configuration  
- Other OAuth providers
- Troubleshooting OAuth issues

## Usage Examples

### 1. Using the useUser Hook

```tsx
import { useUser } from '../hooks/useUser'

function MyComponent() {
  const { user, loading, error } = useUser()

  if (loading) return <div>Loading...</div>
  if (!user) return <div>Please log in</div>

  return <div>Welcome, {user.email}!</div>
}
```

### 2. Authentication

```tsx
import { authService } from '../lib/auth'

// Sign up
const handleSignup = async () => {
  const { user, error } = await authService.signUp({
    email: 'user@example.com',
    password: 'password123',
    businessName: 'My Business',
    businessType: 'retail'
  })
  
  if (error) {
    console.error('Signup error:', error.message)
  } else {
    console.log('User created:', user)
  }
}

// Login
const handleLogin = async () => {
  const { user, error } = await authService.login({
    email: 'user@example.com',
    password: 'password123'
  })
  
  if (error) {
    console.error('Login error:', error.message)
  } else {
    console.log('User logged in:', user)
  }
}

// OAuth Login
const handleGoogleLogin = async () => {
  const { error } = await authService.signInWithGoogle()
  if (error) {
    console.error('Google login error:', error.message)
  }
  // On success, user will be redirected automatically
}

// Logout
const handleLogout = async () => {
  const { error } = await authService.logout()
  if (!error) {
    // Redirect to login page
  }
}
```

### 3. Database Operations

```tsx
import { databaseService } from '../lib/database'

// Get user's business profile
const getProfile = async (userId: string) => {
  const profile = await databaseService.getUserBusinessProfile(userId)
  console.log(profile)
}

// Update business profile
const updateProfile = async (userId: string) => {
  const updatedProfile = await databaseService.updateBusinessProfile(userId, {
    business_name: 'New Business Name',
    description: 'Updated description'
  })
  console.log(updatedProfile)
}

// Get user's media assets
const getMediaAssets = async (userId: string) => {
  const assets = await databaseService.getUserMediaAssets(userId)
  console.log(assets)
}
```

## File Structure

```
lib/
├── supabase.ts          # Client configuration and types
├── supabase-server.ts   # Server-side client
├── auth.ts              # Authentication utilities
└── database.ts          # Database operations

hooks/
└── useUser.ts           # User authentication hook

components/
└── AuthForm.tsx         # Reusable auth form

pages/
├── login.tsx            # Login page
├── signup.tsx           # Signup page
├── dashboard.tsx        # Protected dashboard
└── _app.js              # App component

middleware.ts            # Route protection
```

## Available Scripts

The app includes the following functionality:

- **Authentication**: Sign up, login, logout with automatic business profile creation
- **OAuth Integration**: Google and Apple OAuth with automatic profile creation
- **Route Protection**: Middleware protects dashboard routes
- **User Management**: React hook for managing user state
- **Database Operations**: Full CRUD operations for business profiles and media assets
- **File Upload**: Support for uploading files to Supabase Storage
- **TypeScript Support**: Full type safety with generated types

## Development

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Visit `http://localhost:3000` to see the app
3. Navigate to `/login` or `/signup` to test authentication
4. After login, you'll be redirected to `/dashboard`

## Key Features

- ✅ Full TypeScript support
- ✅ Email/password authentication
- ✅ Google OAuth integration
- ✅ Apple OAuth integration
- ✅ Automatic business profile creation on signup
- ✅ Protected routes with middleware
- ✅ User authentication state management
- ✅ Database operations with RLS
- ✅ File upload support
- ✅ Error handling
- ✅ Modern UI with Tailwind CSS

## Troubleshooting

### Common Issues

1. **Authentication not working**: Check your environment variables and Supabase project settings
2. **Database errors**: Ensure RLS policies are set up correctly
3. **OAuth not working**: See [SUPABASE_OAUTH_SETUP.md](./SUPABASE_OAUTH_SETUP.md) for detailed OAuth troubleshooting
4. **File upload issues**: Verify storage bucket exists and has correct policies
5. **TypeScript errors**: Make sure all dependencies are installed

### Environment Variables Missing

If you see errors about missing environment variables, make sure you've created `.env.local` with the correct Supabase credentials.

### Database Connection Issues

Verify your Supabase URL is correct and your project is active. Check the network tab in browser dev tools for any failed requests. 