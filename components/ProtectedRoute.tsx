import { useEffect, ReactNode } from 'react'
import { useRouter } from 'next/router'
import { useUser } from '../hooks/useUser'

interface ProtectedRouteProps {
  children: ReactNode
  redirectTo?: string
  fallback?: ReactNode
}

export default function ProtectedRoute({ 
  children, 
  redirectTo = '/login',
  fallback 
}: ProtectedRouteProps) {
  const { user, loading } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push(redirectTo)
    }
  }, [user, loading, router, redirectTo])

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // Show fallback if provided and user is not authenticated
  if (!user && fallback) {
    return <>{fallback}</>
  }

  // Don't render anything if not authenticated (will redirect)
  if (!user) {
    return null
  }

  // Render children if authenticated
  return <>{children}</>
} 