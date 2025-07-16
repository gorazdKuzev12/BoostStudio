# Supabase OAuth Setup Guide

This guide will help you set up Google OAuth (and other OAuth providers) with your Supabase project.

## Prerequisites

1. A Supabase project (already created)
2. A Google Cloud Console account
3. Your Supabase project configured with the database tables from `SUPABASE_SETUP.md`

## Step 1: Set up Google OAuth in Google Cloud Console

### 1.1 Create a Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Note your project ID

### 1.2 Enable Google+ API
1. Go to **APIs & Services > Library**
2. Search for "Google+ API"
3. Click on it and press **Enable**

### 1.3 Configure OAuth Consent Screen
1. Go to **APIs & Services > OAuth consent screen**
2. Choose **External** user type (unless you have a workspace)
3. Fill out the required fields:
   - **App name**: GlowBoost Studio
   - **User support email**: Your email
   - **Developer contact email**: Your email
4. Add scopes (optional for basic setup):
   - `../auth/userinfo.email`
   - `../auth/userinfo.profile`
5. Save and continue through the steps

### 1.4 Create OAuth Credentials
1. Go to **APIs & Services > Credentials**
2. Click **Create Credentials > OAuth 2.0 Client ID**
3. Choose **Web application**
4. Add your domain information:
   - **Name**: GlowBoost Studio Web Client
   - **Authorized JavaScript origins**: 
     - `http://localhost:3000` (for development)
     - `https://yourdomain.com` (for production)
   - **Authorized redirect URIs**:
     - `https://your-project-ref.supabase.co/auth/v1/callback`
     - Replace `your-project-ref` with your actual Supabase project reference
5. Click **Create**
6. Copy the **Client ID** and **Client Secret**

## Step 2: Configure Supabase OAuth

### 2.1 Add Google OAuth Provider
1. Go to your [Supabase Dashboard](https://app.supabase.com/)
2. Select your project
3. Go to **Authentication > Providers**
4. Find **Google** in the list and click the toggle to enable it
5. Enter your Google OAuth credentials:
   - **Client ID**: Paste from Google Cloud Console
   - **Client Secret**: Paste from Google Cloud Console
6. Click **Save**

### 2.2 Configure Redirect URLs
1. In Supabase Dashboard, go to **Authentication > Settings**
2. In the **Site URL** field, enter your production domain (e.g., `https://yourdomain.com`)
3. In **Additional Redirect URLs**, add:
   - `http://localhost:3000/dashboard` (for development)
   - `https://yourdomain.com/dashboard` (for production)
4. Click **Save**

## Step 3: Update Your Environment Variables

Update your `.env.local` file to include any additional configuration if needed:

```bash
# Supabase Configuration (already set)
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Optional: Add Google OAuth Client ID for additional client-side features
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id_here
```

## Step 4: Test the OAuth Flow

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `http://localhost:3000/login`

3. Click "Log in with Google"

4. You should be redirected to Google's OAuth consent screen

5. After approving, you'll be redirected back to your dashboard

## Step 5: Set up Apple OAuth (Optional)

### 5.1 Apple Developer Setup
1. Go to [Apple Developer Console](https://developer.apple.com/)
2. Sign in with your Apple ID
3. Go to **Certificates, Identifiers & Profiles**
4. Create a new **App ID** or use existing one
5. Enable **Sign In with Apple** capability

### 5.2 Create Service ID
1. Go to **Identifiers** and create a new **Services ID**
2. Enable **Sign In with Apple**
3. Configure domains and return URLs:
   - **Domains**: `your-project-ref.supabase.co`
   - **Return URLs**: `https://your-project-ref.supabase.co/auth/v1/callback`

### 5.3 Configure in Supabase
1. In Supabase Dashboard, go to **Authentication > Providers**
2. Enable **Apple**
3. Enter your Apple configuration:
   - **Services ID**: From Apple Developer Console
   - **Secret Key**: Generate and download from Apple Developer Console
4. Click **Save**

## Step 6: Handle OAuth User Data

The current implementation automatically:

1. **Creates business profiles** for OAuth users with default values
2. **Handles existing users** by checking if they already have a profile
3. **Uses user metadata** from OAuth providers for business name

### Customizing OAuth User Handling

You can modify the `handleOAuthUser` function in `lib/auth.ts` to:

```typescript
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
      const businessName = 
        user.user_metadata?.full_name || 
        user.user_metadata?.name || 
        user.email?.split('@')[0] // Use email prefix as fallback

      await this.createBusinessProfile(
        user.id,
        businessName,
        'other' // Default business type for OAuth users
      )
    }
  } catch (error) {
    console.error('Error handling OAuth user:', error)
  }
}
```

## Step 7: Production Deployment

When deploying to production:

1. **Update Google Cloud Console**:
   - Add your production domain to authorized origins
   - Add production redirect URI

2. **Update Supabase Settings**:
   - Update Site URL to your production domain
   - Add production redirect URLs

3. **Environment Variables**:
   - Ensure all environment variables are properly set in your hosting platform

## Troubleshooting

### Common Issues

1. **OAuth redirect mismatch**:
   - Verify redirect URIs match exactly in Google Cloud Console and Supabase
   - Check for trailing slashes and protocol (http vs https)

2. **Google OAuth not working**:
   - Ensure Google+ API is enabled
   - Check OAuth consent screen is properly configured
   - Verify client ID and secret are correct

3. **User profile not created**:
   - Check browser console for errors
   - Verify database RLS policies allow inserts
   - Check the `handleOAuthUser` function is being called

4. **Development vs Production issues**:
   - Ensure all URLs are updated for your environment
   - Check that cookies are properly set (secure flag for HTTPS)

### Debug Steps

1. Check browser developer tools for network errors
2. Check Supabase auth logs in the dashboard
3. Verify OAuth provider configuration in Supabase dashboard
4. Test with a fresh incognito browser session

## Security Considerations

1. **Environment Variables**: Never commit client secrets to version control
2. **Redirect URLs**: Only add trusted domains to prevent OAuth hijacking
3. **Scope Permissions**: Request minimal necessary permissions from OAuth providers
4. **RLS Policies**: Ensure your database policies are properly configured

## Additional OAuth Providers

The same pattern can be used to add other OAuth providers:
- GitHub
- Facebook
- Twitter
- LinkedIn
- Microsoft

Just replace `google` with the provider name in the auth service and follow similar setup steps for each provider. 