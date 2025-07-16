import { useState } from 'react'
import { Eye, EyeOff, Sparkles } from 'lucide-react'
import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { authService } from '../lib/auth'

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [isAppleLoading, setIsAppleLoading] = useState(false)
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (error) setError('') // Clear error when user starts typing
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const { user, error } = await authService.login({
        email: formData.email,
        password: formData.password
      })
      
      if (error) {
        setError(error.message)
      } else if (user) {
        router.push('/dashboard')
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true)
    setError('')

    try {
      const { error } = await authService.signInWithGoogle()
      
      if (error) {
        setError(error.message)
      }
      // Note: On success, user will be redirected by Supabase
    } catch (err) {
      setError('An unexpected error occurred with Google login')
    } finally {
      setIsGoogleLoading(false)
    }
  }

  const handleAppleLogin = async () => {
    setIsAppleLoading(true)
    setError('')

    try {
      const { error } = await authService.signInWithApple()
      
      if (error) {
        setError(error.message)
      }
      // Note: On success, user will be redirected by Supabase
    } catch (err) {
      setError('An unexpected error occurred with Apple login')
    } finally {
      setIsAppleLoading(false)
    }
  }

  const handleSSO = () => {
    // Handle SSO - implement when needed
    setError('SSO is not yet implemented. Please use email/password or social login.')
  }

  return (
    <>
      <Head>
        <title>Sign In - GlowBoost Studio</title>
        <meta name="description" content="Sign in to your GlowBoost Studio account" />
      </Head>

      <div className="min-h-screen flex font-sans">
        {/* Left Side - Video Background */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
          {/* Video Background */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* Gradient Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60"></div>
          
          {/* Beauty-themed floating icon */}
          <div className="absolute top-28 left-1/2 transform -translate-x-1/2 animate-float z-10">
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <Sparkles className="h-7 w-7 text-white" />
            </div>
          </div>

          {/* Content */}
          <div className="relative z-20 flex flex-col justify-center px-12 text-white">
            <div className="mb-6">
              <div className="flex items-center space-x-2.5 mb-6">
                <div className="bg-white/30 backdrop-blur-sm p-2.5 rounded-xl shadow-lg">
                  <Sparkles className="h-7 w-7 text-white" />
                </div>
                <span className="text-2xl font-bold drop-shadow-lg">GlowBoost Studio</span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6 drop-shadow-lg">
              Everything you need<br />
              to grow your<br />
              <span className="text-yellow-300 drop-shadow-lg">beauty business</span>
            </h1>
            
            <p className="text-lg text-white/95 leading-relaxed max-w-lg drop-shadow-md">
              Professional websites, stunning videos, and high-converting ads designed specifically for nail salons, lash artists, and beauty professionals.
            </p>
            
            {/* Floating Beauty Elements */}
            <div className="absolute bottom-28 left-12 opacity-30">
              <div className="grid grid-cols-3 gap-3">
                <div className="w-10 h-10 bg-white/80 rounded-lg backdrop-blur-sm"></div>
                <div className="w-10 h-10 bg-white/60 rounded-lg backdrop-blur-sm"></div>
                <div className="w-10 h-10 bg-white/40 rounded-lg backdrop-blur-sm"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="lg:hidden flex items-center justify-center space-x-3 mb-12">
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-2 rounded-xl">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">
                GlowBoost<span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Studio</span>
              </span>
            </div>

            <div className="text-center lg:text-left mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Welcome to GlowBoost</h2>
              <p className="text-gray-600">
                Don't have an account?{' '}
                <Link href="/signup" className="text-blue-600 hover:text-purple-600 font-semibold transition-colors">
                  Sign up for free
                </Link>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your@email.com"
                  className="w-full p-4 border border-gray-300 rounded-xl focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 transition-all text-lg"
                  required
                />
              </div>

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••••••"
                  className="w-full p-4 border border-gray-300 rounded-xl focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 transition-all text-lg pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>

              {error && (
                <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gray-900 text-white py-4 rounded-xl font-semibold text-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Signing in...' : 'Log in'}
              </button>
            </form>

            <div className="my-8 flex items-center">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="px-4 text-gray-500 text-sm font-medium">OR</span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleGoogleLogin}
                disabled={isGoogleLoading}
                className="w-full flex items-center justify-center gap-3 p-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285f4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34a853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#fbbc05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#ea4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="text-gray-700 font-medium">
                  {isGoogleLoading ? 'Connecting...' : 'Log in with Google'}
                </span>
              </button>

              <button
                onClick={handleAppleLogin}
                disabled={isAppleLoading}
                className="w-full flex items-center justify-center gap-3 p-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <span className="text-gray-700 font-medium">
                  {isAppleLoading ? 'Connecting...' : 'Log in with Apple'}
                </span>
              </button>

              <button
                onClick={handleSSO}
                className="w-full p-4 border-2 border-blue-600 text-blue-600 rounded-xl hover:bg-blue-600/5 transition-colors font-medium"
              >
                Use Single Sign-On (SSO)
              </button>
            </div>

            <div className="text-center mt-8">
              <Link href="/forgot-password" className="text-gray-600 hover:text-blue-600 transition-colors">
                Forgot Password
              </Link>
            </div>
          </div>
        </div>

        {/* CSS for animations */}
        <style jsx>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(5deg); }
          }
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
        `}</style>
      </div>
    </>
  )
} 