import { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useUser } from '../hooks/useUser'
import { authService } from '../lib/auth'
import { databaseService, BusinessProfile, MediaAsset } from '../lib/database'
import { Sparkles, Bot, Calendar, Image, TrendingUp, Globe, Search, BarChart3, Crown, Check, ArrowUpRight, Settings, Bell } from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  const { user, loading } = useUser()
  const [businessProfile, setBusinessProfile] = useState<BusinessProfile | null>(null)
  const [mediaAssets, setMediaAssets] = useState<MediaAsset[]>([])
  const [loadingData, setLoadingData] = useState(true)
  const [currentPlan, setCurrentPlan] = useState<'standard' | 'pro' | 'vip'>('standard') // This would come from user data
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    } else if (user) {
      loadUserData()
    }
  }, [user, loading, router])

  const loadUserData = async () => {
    if (!user) return

    try {
      setLoadingData(true)
      
      // Fetch business profile and media assets in parallel
      const [profile, assets] = await Promise.all([
        databaseService.getUserBusinessProfile(user.id),
        databaseService.getUserMediaAssets(user.id)
      ])
      
      setBusinessProfile(profile)
      setMediaAssets(assets)
    } catch (error) {
      console.error('Error loading user data:', error)
    } finally {
      setLoadingData(false)
    }
  }

  const handleLogout = async () => {
    const { error } = await authService.logout()
    if (!error) {
      router.push('/login')
    }
  }

  const plans: Record<'standard' | 'pro' | 'vip', {
    name: string;
    price: string;
    color: string;
    icon: string;
    features: string[];
  }> = {
    standard: {
      name: 'Standard',
      price: '€49',
      color: 'from-gray-600 to-gray-700',
      icon: 'S',
      features: [
        'Landing page with virtual bot',
        'Integrated booking calendar',
        '4 social media posts planning',
        '3 generated reels + logo ideas',
        'Email support'
      ]
    },
    pro: {
      name: 'Pro',
      price: '€99',
      color: 'from-primary to-secondary',
      icon: 'P',
      features: [
        'Everything in Standard',
        'AI-powered ads management',
        'Direct booking to virtual assistant',
        'Automated lead qualification',
        'Performance analytics',
        'Priority support'
      ]
    },
    vip: {
      name: 'VIP',
      price: '€149',
      color: 'from-yellow-500 to-yellow-600',
      icon: 'V',
      features: [
        'Everything in Pro',
        'Full website development',
        'Advanced SEO optimization',
        'Multi-page website structure',
        'Local SEO & Google My Business',
        'Dedicated account manager'
      ]
    }
  }

  const usageStats: Record<'standard' | 'pro' | 'vip', any> = {
    standard: {
      posts: { used: 2, total: 4 },
      reels: { used: 1, total: 3 },
      calendar: { bookings: 12 },
      bot: { conversations: 34 }
    },
    pro: {
      posts: { used: 3, total: 4 },
      reels: { used: 2, total: 3 },
      calendar: { bookings: 28 },
      bot: { conversations: 89 },
      ads: { campaigns: 2, leads: 15 }
    },
    vip: {
      posts: { used: 4, total: 4 },
      reels: { used: 3, total: 3 },
      calendar: { bookings: 45 },
      bot: { conversations: 156 },
      ads: { campaigns: 4, leads: 32 },
      seo: { ranking: 'Page 1', traffic: '+125%' }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null // Will redirect to login
  }

  return (
    <>
      <Head>
        <title>Dashboard - GlowBoost Studio</title>
        <meta name="description" content="Your GlowBoost Studio dashboard" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
        {/* Header */}
        <header className="bg-white/90 backdrop-blur-xl border-b border-gray-100 shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-to-br from-primary to-secondary p-2 rounded-xl">
                    <Sparkles className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-2xl font-bold text-slate-dark">GlowBoost<span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Studio</span></span>
                </div>
                <div className="flex items-center space-x-2 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full px-4 py-2">
                  <div className={`bg-gradient-to-r ${plans[currentPlan].color} w-6 h-6 rounded-lg flex items-center justify-center`}>
                    <span className="text-white text-xs font-bold">{plans[currentPlan].icon}</span>
                  </div>
                  <span className="text-sm font-semibold text-slate-dark">{plans[currentPlan].name} Plan</span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button className="p-2 text-gray-600 hover:text-primary transition-colors">
                  <Bell className="h-5 w-5" />
                </button>
                <button className="p-2 text-gray-600 hover:text-primary transition-colors">
                  <Settings className="h-5 w-5" />
                </button>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className="text-sm font-medium text-slate-dark">{businessProfile?.business_name || 'Your Business'}</div>
                    <div className="text-xs text-gray-500">{user.email}</div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-xl text-sm font-medium transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {loadingData ? (
            <div className="text-center py-16">
              <div className="animate-pulse space-y-4">
                <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Welcome Section */}
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-slate-dark mb-4">
                  Welcome back, <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{businessProfile?.business_name || 'Beauty Professional'}</span>! ✨
                </h1>
                <p className="text-xl text-gray-600">Here's your business growth overview</p>
              </div>

              {/* Current Plan Overview */}
              <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
                <div className={`bg-gradient-to-r ${plans[currentPlan].color} p-8 text-white`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold mb-2">Your {plans[currentPlan].name} Plan</h2>
                      <p className="text-white/90">Everything you need to grow your beauty business</p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold">{plans[currentPlan].price}</div>
                      <div className="text-white/90">per month</div>
                    </div>
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Usage Stats based on plan */}
                    {currentPlan === 'standard' && (
                      <>
                        <div className="text-center p-4 bg-gray-50 rounded-2xl">
                          <div className="text-2xl font-bold text-primary mb-1">{usageStats.standard.posts.used}/{usageStats.standard.posts.total}</div>
                          <div className="text-sm text-gray-600">Posts Planned</div>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-2xl">
                          <div className="text-2xl font-bold text-secondary mb-1">{usageStats.standard.reels.used}/{usageStats.standard.reels.total}</div>
                          <div className="text-sm text-gray-600">Reels Generated</div>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-2xl">
                          <div className="text-2xl font-bold text-primary mb-1">{usageStats.standard.calendar.bookings}</div>
                          <div className="text-sm text-gray-600">This Month Bookings</div>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-2xl">
                          <div className="text-2xl font-bold text-secondary mb-1">{usageStats.standard.bot.conversations}</div>
                          <div className="text-sm text-gray-600">Bot Conversations</div>
                        </div>
                      </>
                    )}
                    
                    {currentPlan === 'pro' && (
                      <>
                        <div className="text-center p-4 bg-gray-50 rounded-2xl">
                          <div className="text-2xl font-bold text-primary mb-1">{usageStats.pro.posts.used}/{usageStats.pro.posts.total}</div>
                          <div className="text-sm text-gray-600">Posts Planned</div>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-2xl">
                          <div className="text-2xl font-bold text-secondary mb-1">{usageStats.pro.ads.campaigns}</div>
                          <div className="text-sm text-gray-600">Active Campaigns</div>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-2xl">
                          <div className="text-2xl font-bold text-primary mb-1">{usageStats.pro.ads.leads}</div>
                          <div className="text-sm text-gray-600">New Leads</div>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-2xl">
                          <div className="text-2xl font-bold text-secondary mb-1">{usageStats.pro.calendar.bookings}</div>
                          <div className="text-sm text-gray-600">Monthly Bookings</div>
                        </div>
                      </>
                    )}

                    {currentPlan === 'vip' && (
                      <>
                        <div className="text-center p-4 bg-gray-50 rounded-2xl">
                          <div className="text-2xl font-bold text-primary mb-1">{usageStats.vip.ads.campaigns}</div>
                          <div className="text-sm text-gray-600">Active Campaigns</div>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-2xl">
                          <div className="text-2xl font-bold text-secondary mb-1">{usageStats.vip.ads.leads}</div>
                          <div className="text-sm text-gray-600">Monthly Leads</div>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-2xl">
                          <div className="text-2xl font-bold text-primary mb-1">{usageStats.vip.seo.ranking}</div>
                          <div className="text-sm text-gray-600">Google Ranking</div>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-2xl">
                          <div className="text-2xl font-bold text-secondary mb-1">{usageStats.vip.seo.traffic}</div>
                          <div className="text-sm text-gray-600">Traffic Growth</div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Link href="/create-landing-page" className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                  <div className="bg-gradient-to-br from-primary/10 to-primary/5 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Bot className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-slate-dark mb-2">Update Landing Page</h3>
                  <p className="text-sm text-gray-600 mb-3">Modify your landing page and virtual bot</p>
                  <div className="flex items-center text-primary text-sm font-medium">
                    Edit Now <ArrowUpRight className="h-4 w-4 ml-1" />
                  </div>
                </Link>

                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group cursor-pointer">
                  <div className="bg-gradient-to-br from-secondary/10 to-secondary/5 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Calendar className="h-6 w-6 text-secondary" />
                  </div>
                  <h3 className="font-bold text-slate-dark mb-2">Booking Calendar</h3>
                  <p className="text-sm text-gray-600 mb-3">Manage appointments and availability</p>
                  <div className="flex items-center text-secondary text-sm font-medium">
                    View Calendar <ArrowUpRight className="h-4 w-4 ml-1" />
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group cursor-pointer">
                  <div className="bg-gradient-to-br from-primary/10 to-primary/5 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Image className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-slate-dark mb-2">Content Creation</h3>
                  <p className="text-sm text-gray-600 mb-3">Generate posts and reels</p>
                  <div className="flex items-center text-primary text-sm font-medium">
                    Create Content <ArrowUpRight className="h-4 w-4 ml-1" />
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group cursor-pointer">
                  <div className="bg-gradient-to-br from-secondary/10 to-secondary/5 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <BarChart3 className="h-6 w-6 text-secondary" />
                  </div>
                  <h3 className="font-bold text-slate-dark mb-2">Analytics</h3>
                  <p className="text-sm text-gray-600 mb-3">Track your performance</p>
                  <div className="flex items-center text-secondary text-sm font-medium">
                    View Stats <ArrowUpRight className="h-4 w-4 ml-1" />
                  </div>
                </div>
              </div>

              {/* Upgrade Plans */}
              {currentPlan !== 'vip' && (
                <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-3xl p-8 border border-primary/20">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-slate-dark mb-4">Ready to Grow Even More?</h2>
                    <p className="text-xl text-gray-600">Upgrade your plan and unlock powerful new features</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {currentPlan === 'standard' && (
                      <>
                        <div className="bg-white rounded-2xl p-6 border-2 border-primary">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold text-slate-dark">Pro Plan</h3>
                            <div className="text-2xl font-bold text-primary">€99/mo</div>
                          </div>
                          <ul className="space-y-2 mb-6">
                            <li className="flex items-center gap-2 text-sm">
                              <Check className="h-4 w-4 text-green-500" />
                              AI-powered ads management
                            </li>
                            <li className="flex items-center gap-2 text-sm">
                              <Check className="h-4 w-4 text-green-500" />
                              Direct booking to virtual assistant
                            </li>
                            <li className="flex items-center gap-2 text-sm">
                              <Check className="h-4 w-4 text-green-500" />
                              Performance analytics
                            </li>
                          </ul>
                          <button className="w-full bg-gradient-to-r from-primary to-secondary text-white py-3 rounded-xl font-semibold">
                            Upgrade to Pro
                          </button>
                        </div>
                        
                        <div className="bg-white rounded-2xl p-6 border border-gray-200">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold text-slate-dark">VIP Plan</h3>
                            <div className="text-2xl font-bold text-yellow-600">€149/mo</div>
                          </div>
                          <ul className="space-y-2 mb-6">
                            <li className="flex items-center gap-2 text-sm">
                              <Check className="h-4 w-4 text-green-500" />
                              Full website development
                            </li>
                            <li className="flex items-center gap-2 text-sm">
                              <Check className="h-4 w-4 text-green-500" />
                              Advanced SEO optimization
                            </li>
                            <li className="flex items-center gap-2 text-sm">
                              <Check className="h-4 w-4 text-green-500" />
                              Dedicated account manager
                            </li>
                          </ul>
                          <button className="w-full bg-yellow-500 text-white py-3 rounded-xl font-semibold">
                            Upgrade to VIP
                          </button>
                        </div>
                      </>
                    )}
                    
                    {currentPlan === 'pro' && (
                      <div className="bg-white rounded-2xl p-6 border-2 border-yellow-500 max-w-md mx-auto">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-xl font-bold text-slate-dark">VIP Plan</h3>
                          <div className="text-2xl font-bold text-yellow-600">€149/mo</div>
                        </div>
                        <ul className="space-y-2 mb-6">
                          <li className="flex items-center gap-2 text-sm">
                            <Check className="h-4 w-4 text-green-500" />
                            Full website development
                          </li>
                          <li className="flex items-center gap-2 text-sm">
                            <Check className="h-4 w-4 text-green-500" />
                            Advanced SEO optimization
                          </li>
                          <li className="flex items-center gap-2 text-sm">
                            <Check className="h-4 w-4 text-green-500" />
                            Local SEO & Google My Business
                          </li>
                          <li className="flex items-center gap-2 text-sm">
                            <Check className="h-4 w-4 text-green-500" />
                            Dedicated account manager
                          </li>
                        </ul>
                        <button className="w-full bg-yellow-500 text-white py-3 rounded-xl font-semibold">
                          Upgrade to VIP
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </>
  )
} 