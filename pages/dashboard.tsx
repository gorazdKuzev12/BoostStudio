import { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useUser } from '../hooks/useUser'
import { authService } from '../lib/auth'
import { Calendar, Clock, User, LogOut, Phone, Mail, Plus, X, ChevronLeft, ChevronRight, RefreshCw, MapPin, Coffee, Sparkles, Star, Camera, MessageCircle, Heart, Ban, Edit3, Image, DollarSign, Award, TrendingUp } from 'lucide-react'

// Static mock customer data - replace with API later
const mockCustomerHistory: Record<string, CustomerProfile> = {
  'default': {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    phone: '+1 (555) 123-4567',
    avatar: null,
    since: '2024-03-15',
    totalVisits: 8,
    totalSpent: 680,
    avgRating: 4.8,
    noShowRate: 0,
    tags: ['VIP', 'Loyal'],
    notes: 'Prefers gentle pressure during scalp massage. Allergic to certain hair products - always check before using new products.',
    visits: [
      {
        id: 'v1',
        date: '2024-12-10',
        service: 'Volume Lashes - Full Set',
        duration: 90,
        price: 120,
        rating: 5,
        notes: 'Loved the natural look! Will come back.',
        beforeImage: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=200&h=200&fit=crop',
        afterImage: 'https://images.unsplash.com/photo-1588516903720-8ceb67f9ef84?w=200&h=200&fit=crop',
        stylist: 'You'
      },
      {
        id: 'v2',
        date: '2024-11-25',
        service: 'Lash Lift & Tint',
        duration: 60,
        price: 85,
        rating: 5,
        notes: 'Perfect curl!',
        beforeImage: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=200&h=200&fit=crop',
        afterImage: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=200&h=200&fit=crop',
        stylist: 'You'
      },
      {
        id: 'v3',
        date: '2024-11-01',
        service: 'Classic Lashes - Refill',
        duration: 45,
        price: 65,
        rating: 4,
        notes: '',
        beforeImage: null,
        afterImage: 'https://images.unsplash.com/photo-1522337094846-8a818d5bf166?w=200&h=200&fit=crop',
        stylist: 'You'
      },
      {
        id: 'v4',
        date: '2024-10-15',
        service: 'Volume Lashes - Full Set',
        duration: 90,
        price: 120,
        rating: 5,
        notes: 'First time client - absolutely loved it!',
        beforeImage: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=200&h=200&fit=crop',
        afterImage: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=200&h=200&fit=crop',
        stylist: 'You'
      }
    ]
  }
}

interface Visit {
  id: string
  date: string
  service: string
  duration: number
  price: number
  rating: number | null
  notes: string
  beforeImage: string | null
  afterImage: string | null
  stylist: string
}

interface CustomerProfile {
  id: string
  name: string
  email: string
  phone: string
  avatar: string | null
  since: string
  totalVisits: number
  totalSpent: number
  avgRating: number
  noShowRate: number
  tags: string[]
  notes: string
  visits: Visit[]
}

// Static earnings data - replace with API later
const mockEarnings = {
  today: 450,
  week: 2100,
  month: 8400
}

export default function DashboardPage() {
  const { user, loading } = useUser()
  const router = useRouter()

  const CAL_LINK = 'gorazd-kuzev-oga4y8/15min'
  const [currentPlan] = useState<'essential' | 'auto-booker' | 'viral-vip'>('auto-booker')
  const [showAddBooking, setShowAddBooking] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [appointments, setAppointments] = useState<any[]>([])
  const [loadingBookings, setLoadingBookings] = useState(true)
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerProfile | null>(null)
  const [customerTab, setCustomerTab] = useState<'history' | 'photos' | 'notes'>('history')
  const [showImageViewer, setShowImageViewer] = useState<{ before: string | null, after: string | null } | null>(null)
  const [earnings] = useState(mockEarnings)

  const fetchBookings = async () => {
    try {
      setLoadingBookings(true)
      const response = await fetch('/api/bookings')
      const data = await response.json()
      if (data.bookings) {
        setAppointments(data.bookings)
      }
    } catch (error) {
      console.error('Error fetching bookings:', error)
    } finally {
      setLoadingBookings(false)
    }
  }

  const plans = {
    'essential': { name: 'Essential', icon: '💅', color: 'bg-gray-600' },
    'auto-booker': { name: 'Pro', icon: '✨', color: 'bg-primary' },
    'viral-vip': { name: 'VIP', icon: '👑', color: 'bg-amber-500' }
  }

  useEffect(() => {
    if (!loading && !user) router.push('/login')
  }, [user, loading, router])

  useEffect(() => {
    if (user) fetchBookings()
  }, [user])

  const handleLogout = async () => {
    const { error } = await authService.logout()
    if (!error) router.push('/login')
  }

  // Get 7 days centered around selected date
  const getWeekDays = () => {
    const days = []
    const start = new Date(selectedDate)
    start.setDate(start.getDate() - 3)
    for (let i = 0; i < 7; i++) {
      const d = new Date(start)
      d.setDate(start.getDate() + i)
      days.push(d)
    }
    return days
  }

  const weekDays = getWeekDays()
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const getBookingsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0]
    return appointments.filter(apt => apt.date === dateStr)
  }

  const isToday = (date: Date) => new Date().toDateString() === date.toDateString()
  const isSelected = (date: Date) => selectedDate.toDateString() === date.toDateString()

  const selectedDayBookings = getBookingsForDate(selectedDate)
  const todayBookings = getBookingsForDate(new Date())

  const navigateWeek = (direction: number) => {
    const newDate = new Date(selectedDate)
    newDate.setDate(newDate.getDate() + (direction * 7))
    setSelectedDate(newDate)
  }

  const goToToday = () => setSelectedDate(new Date())

  // Open customer profile with mock data (will fetch from API later)
  const openCustomerProfile = (booking: any) => {
    // For now, use default mock data with the booking client name
    const customerData = { ...mockCustomerHistory['default'] }
    customerData.name = booking.clientName || customerData.name
    customerData.email = booking.email || customerData.email
    customerData.phone = booking.phone || customerData.phone
    setSelectedCustomer(customerData)
    setCustomerTab('history')
  }

  // Render star rating
  const renderStars = (rating: number, size: 'sm' | 'md' = 'sm') => {
    const sizeClass = size === 'sm' ? 'h-3.5 w-3.5' : 'h-5 w-5'
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${sizeClass} ${star <= rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}`}
          />
        ))}
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent"></div>
      </div>
    )
  }

  if (!user) return null
  const plan = plans[currentPlan]

  return (
    <>
      <Head>
        <title>Dashboard - GetBookingFlow</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </Head>
      
      <div className="min-h-screen bg-[#f8f9fa]">
        {/* Header - Compact */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="px-4 h-14 flex justify-between items-center max-w-5xl mx-auto">
            <span className="text-lg font-bold text-gray-900">
              Booking<span className="text-primary">Flow</span>
            </span>
            <div className="flex items-center gap-2">
              <span className={`${plan.color} text-white text-xs px-2 py-0.5 rounded-full font-medium`}>
                {plan.icon} {plan.name}
              </span>
              <button onClick={handleLogout} className="p-1.5 text-gray-400 hover:text-gray-600">
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          {/* Earnings Bar - Desktop (top) - Balanced Design */}
          <div className="hidden sm:block bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 border-t border-slate-500/30">
            <div className="max-w-5xl mx-auto w-full px-4 py-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-slate-300">Revenue</span>
              </div>
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 uppercase tracking-wide">Today</span>
                  <span className="font-bold text-primary text-lg">${earnings.today}</span>
                </div>
                <div className="w-px h-5 bg-slate-500/50"></div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 uppercase tracking-wide">Week</span>
                  <span className="font-bold text-white text-lg">${earnings.week.toLocaleString()}</span>
                </div>
                <div className="w-px h-5 bg-slate-500/50"></div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 uppercase tracking-wide">Month</span>
                  <span className="font-bold text-white text-lg">${earnings.month.toLocaleString()}</span>
                  <TrendingUp className="h-4 w-4 text-green-400" />
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-5xl mx-auto">
          {/* Quick Stats - Compact horizontal */}
          <div className="px-4 py-3 flex gap-4 text-sm border-b border-gray-100 bg-white">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              <span className="text-gray-500">Today</span>
              <span className="font-semibold text-gray-900">{todayBookings.length}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span className="text-gray-500">Confirmed</span>
              <span className="font-semibold text-gray-900">
                {appointments.filter(a => a.status === 'accepted' || a.status === 'confirmed').length}
              </span>
              </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
              <span className="text-gray-500">Pending</span>
              <span className="font-semibold text-gray-900">
                {appointments.filter(a => a.status === 'pending').length}
              </span>
            </div>
          </div>

          {/* Date Navigation - Fresha style */}
          <div className="bg-white border-b border-gray-100">
            {/* Month & Navigation */}
            <div className="px-4 py-2 flex items-center justify-between">
              <button onClick={() => navigateWeek(-1)} className="p-1.5 hover:bg-gray-100 rounded-lg">
                <ChevronLeft className="h-5 w-5 text-gray-600" />
              </button>
              <div className="text-center">
                <span className="font-semibold text-gray-900">
                  {selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </span>
              </div>
              <button onClick={() => navigateWeek(1)} className="p-1.5 hover:bg-gray-100 rounded-lg">
                <ChevronRight className="h-5 w-5 text-gray-600" />
              </button>
                    </div>

            {/* Day Selector Strip */}
            <div className="px-2 pb-3 flex justify-between">
              {weekDays.map((date, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedDate(date)}
                  className={`flex-1 py-2 px-1 rounded-xl transition-all ${
                    isSelected(date)
                      ? 'bg-primary text-white'
                      : isToday(date)
                      ? 'bg-primary/10 text-primary'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className={`text-[10px] uppercase ${isSelected(date) ? 'text-white/80' : 'text-gray-400'}`}>
                    {dayNames[date.getDay()]}
                    </div>
                  <div className={`text-lg font-semibold ${isSelected(date) ? 'text-white' : 'text-gray-900'}`}>
                    {date.getDate()}
                  </div>
                  {getBookingsForDate(date).length > 0 && !isSelected(date) && (
                    <div className="w-1 h-1 bg-primary rounded-full mx-auto mt-0.5"></div>
                  )}
                </button>
              ))}
                </div>
                
            {/* Today Button */}
            {!isToday(selectedDate) && (
              <div className="px-4 pb-2">
                <button
                  onClick={goToToday}
                  className="text-xs text-primary font-medium hover:underline"
                >
                  ← Back to Today
                </button>
              </div>
            )}
                        </div>

          {/* Selected Day Header */}
          <div className="px-4 py-3 flex items-center justify-between bg-gray-50">
            <div>
              <h2 className="font-semibold text-gray-900">
                {isToday(selectedDate) ? 'Today' : selectedDate.toLocaleDateString('en-US', { weekday: 'long' })}
              </h2>
              <p className="text-xs text-gray-500">
                {selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                {' • '}{selectedDayBookings.length} appointment{selectedDayBookings.length !== 1 ? 's' : ''}
              </p>
                        </div>
            <div className="flex items-center gap-2">
              <button
                onClick={fetchBookings}
                disabled={loadingBookings}
                className="p-2 text-gray-500 hover:bg-white rounded-lg"
              >
                <RefreshCw className={`h-4 w-4 ${loadingBookings ? 'animate-spin' : ''}`} />
              </button>
              {/* Desktop only - FAB handles mobile */}
              <button
                onClick={() => setShowAddBooking(true)}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-primary text-white rounded-lg text-sm font-medium"
              >
                <Plus className="h-4 w-4" />
                New Booking
              </button>
                        </div>
                        </div>

          {/* Appointments List - Compact Fresha Style */}
          <div className="bg-white min-h-[50vh] pb-20 sm:pb-0">
            {loadingBookings ? (
              <div className="flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent"></div>
                        </div>
            ) : selectedDayBookings.length > 0 ? (
              <div className="divide-y divide-gray-100">
                {selectedDayBookings
                  .sort((a, b) => a.time.localeCompare(b.time))
                  .map((booking, index) => (
                  <button 
                    key={index} 
                    onClick={() => openCustomerProfile(booking)}
                    className="w-full px-4 py-3 hover:bg-gray-50 active:bg-gray-100 transition-colors text-left"
                  >
                    <div className="flex items-center gap-3">
                      {/* Time Column */}
                      <div className="w-14 flex-shrink-0">
                        <div className="text-sm font-semibold text-gray-900">{booking.time}</div>
                        <div className="text-[10px] text-gray-400">15 min</div>
                        </div>

                      {/* Colored Bar */}
                      <div className={`w-1 h-12 rounded-full flex-shrink-0 ${
                        booking.status === 'accepted' || booking.status === 'confirmed'
                          ? 'bg-green-500'
                          : booking.status === 'pending'
                          ? 'bg-amber-500'
                          : 'bg-gray-300'
                      }`}></div>

                      {/* Main Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900 truncate">{booking.clientName}</span>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                            booking.status === 'accepted' || booking.status === 'confirmed'
                              ? 'bg-green-50 text-green-600'
                              : booking.status === 'pending'
                              ? 'bg-amber-50 text-amber-600'
                              : 'bg-gray-100 text-gray-500'
                          }`}>
                            {booking.status === 'accepted' ? 'Confirmed' : booking.status}
                          </span>
                        </div>
                        <div className="text-sm text-gray-500 truncate">{booking.service}</div>
                        {booking.phone && (
                          <div className="flex items-center gap-1 mt-1">
                            <Phone className="h-3 w-3 text-gray-400" />
                            <span className="text-xs text-gray-400">{booking.phone}</span>
                        </div>
                        )}
                      </div>

                      {/* Arrow indicator */}
                      <ChevronRight className="h-4 w-4 text-gray-300 flex-shrink-0" />
                        </div>
                  </button>
                ))}
                        </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 px-6">
                <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mb-5">
                  <Coffee className="h-10 w-10 text-amber-400" />
                        </div>
                <h3 className="font-semibold text-gray-900 text-lg mb-2">
                  {isToday(selectedDate) ? "Free day! ☕" : "Nothing booked"}
                </h3>
                <p className="text-sm text-gray-500 text-center mb-6 max-w-[240px]">
                  {isToday(selectedDate) 
                    ? "No appointments today. Time to relax or catch up!" 
                    : "This day is wide open. Perfect for walk-ins!"}
                </p>
                <button
                  onClick={() => setShowAddBooking(true)}
                  className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-medium shadow-sm hover:shadow-md transition-shadow"
                >
                  <Plus className="h-4 w-4" />
                  Add Walk-In
                </button>
                        </div>
                    )}
                  </div>

          {/* All Upcoming - Quick Overview */}
          {appointments.length > 0 && (
            <div className="bg-white mt-2 border-t border-gray-100 pb-24 sm:pb-4">
              <div className="px-4 py-4 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <h3 className="font-semibold text-gray-900">Upcoming</h3>
                </div>
                <span className="text-xs text-gray-400">Next 5 appointments</span>
              </div>
              <div className="divide-y divide-gray-100">
                {appointments
                  .filter(b => new Date(b.date) >= new Date(new Date().toDateString()))
                  .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                  .slice(0, 5)
                  .map((booking, index) => (
                  <button 
                    key={index} 
                    onClick={() => openCustomerProfile(booking)}
                    className="w-full px-4 py-4 flex items-center gap-4 hover:bg-gray-50 active:bg-gray-100 transition-colors text-left"
                  >
                    <div className="w-12 h-12 bg-primary/5 rounded-xl flex flex-col items-center justify-center flex-shrink-0 border border-primary/10">
                      <span className="text-[10px] text-primary font-medium uppercase">
                        {new Date(booking.date).toLocaleDateString('en-US', { month: 'short' })}
                      </span>
                      <span className="text-base font-bold text-gray-900">
                        {new Date(booking.date).getDate()}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 truncate">{booking.clientName}</div>
                      <div className="text-sm text-gray-500 mt-0.5">{booking.time} • {booking.service}</div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        booking.status === 'accepted' || booking.status === 'confirmed'
                          ? 'bg-green-50 text-green-600'
                          : booking.status === 'pending'
                          ? 'bg-amber-50 text-amber-600'
                          : 'bg-gray-100 text-gray-500'
                      }`}>
                        {booking.status === 'accepted' ? 'Confirmed' : booking.status}
                      </span>
                      <ChevronRight className="h-4 w-4 text-gray-300" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </main>

        {/* Earnings Bar - Mobile (sticky bottom) - Lighter Slate */}
        <div className="fixed bottom-0 left-0 right-0 sm:hidden z-20">
          <div className="bg-gradient-to-r from-slate-600 via-slate-500 to-slate-600 border-t border-slate-400/30 shadow-[0_-4px_15px_rgba(0,0,0,0.1)] px-3 py-2.5">
            <div className="flex items-center justify-between gap-1.5">
              {/* Today - Highlighted */}
              <div className="flex-1 bg-primary/20 rounded-lg px-2 py-1.5 border border-primary/30">
                <div className="flex items-center gap-1 mb-0.5">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></div>
                  <span className="text-[9px] text-primary uppercase tracking-wide font-medium">Today</span>
                </div>
                <span className="text-base font-bold text-white">${earnings.today}</span>
              </div>

              {/* Week */}
              <div className="flex-1 bg-white/10 rounded-lg px-2 py-1.5">
                <span className="text-[9px] text-slate-300 uppercase tracking-wide block mb-0.5">Week</span>
                <span className="text-base font-bold text-white">${earnings.week.toLocaleString()}</span>
              </div>

              {/* Month */}
              <div className="flex-1 bg-white/10 rounded-lg px-2 py-1.5">
                <div className="flex items-center gap-1 mb-0.5">
                  <span className="text-[9px] text-slate-300 uppercase tracking-wide">Month</span>
                  <TrendingUp className="h-2.5 w-2.5 text-green-400" />
                </div>
                <span className="text-base font-bold text-white">${(earnings.month / 1000).toFixed(1)}k</span>
              </div>

              {/* FAB */}
              <button
                onClick={() => setShowAddBooking(true)}
                className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl shadow-lg shadow-primary/30 flex items-center justify-center active:scale-95 transition-transform"
              >
                <Plus className="h-5 w-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add Booking Modal */}
      {showAddBooking && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center">
          <div className="bg-white w-full sm:max-w-lg sm:mx-4 sm:rounded-2xl rounded-t-2xl max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
              <div>
                <h2 className="font-semibold text-gray-900">New Appointment</h2>
                <p className="text-xs text-gray-500">Select date & time</p>
              </div>
              <button onClick={() => setShowAddBooking(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            <div className="px-4 py-2 bg-green-50 border-b border-green-100 flex items-center gap-2 text-sm text-green-700">
              <MapPin className="h-4 w-4" />
              <span>In-Person • Your Salon</span>
            </div>
            <div className="relative overflow-hidden" style={{ height: 'min(500px, 60vh)' }}>
              <iframe
                src={`https://cal.com/${CAL_LINK}?embed=true&theme=light&hideEventTypeDetails=true`}
                width="100%"
                frameBorder="0"
                className="w-full"
                style={{ height: 'calc(100% + 150px)', marginBottom: '-150px' }}
              />
            </div>
          </div>
                  </div>
      )}

      {/* Customer Profile Modal - Bottom Sheet Style */}
      {selectedCustomer && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center"
          onClick={() => setSelectedCustomer(null)}
        >
          <div 
            className="bg-white w-full sm:max-w-lg sm:mx-4 sm:rounded-2xl rounded-t-3xl max-h-[92vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drag Handle - Mobile */}
            <div className="flex justify-center pt-2 pb-1 sm:hidden">
              <div className="w-10 h-1 bg-gray-300 rounded-full"></div>
                  </div>

            {/* Customer Header */}
            <div className="px-4 pt-3 pb-4 bg-gradient-to-br from-primary/5 to-secondary/5">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                    {selectedCustomer.name.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{selectedCustomer.name}</h2>
                    <p className="text-sm text-gray-500">Client since {new Date(selectedCustomer.since).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</p>
                    <div className="flex items-center gap-1.5 mt-1">
                      {selectedCustomer.tags.map((tag, i) => (
                        <span key={i} className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                          tag === 'VIP' ? 'bg-amber-100 text-amber-700' : 'bg-primary/10 text-primary'
                        }`}>
                          {tag === 'VIP' ? '👑 ' : '❤️ '}{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedCustomer(null)} 
                  className="p-2 hover:bg-white/80 rounded-xl"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
                  </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-4 gap-2">
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-2.5 text-center">
                  <div className="text-lg font-bold text-gray-900">{selectedCustomer.totalVisits}</div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-wide">Visits</div>
                  </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-2.5 text-center">
                  <div className="text-lg font-bold text-green-600">${selectedCustomer.totalSpent}</div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-wide">Spent</div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-2.5 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                    <span className="text-lg font-bold text-gray-900">{selectedCustomer.avgRating}</span>
                  </div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-wide">Rating</div>
                  </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-2.5 text-center">
                  <div className="text-lg font-bold text-gray-900">{selectedCustomer.noShowRate}%</div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-wide">No-show</div>
                </div>
              </div>
                  </div>
                  
            {/* Quick Actions */}
            <div className="px-4 py-3 flex gap-2 border-b border-gray-100">
              <a 
                href={`tel:${selectedCustomer.phone}`}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-primary text-white rounded-xl font-medium text-sm active:scale-95 transition-transform"
              >
                <Phone className="h-4 w-4" />
                Call
              </a>
              <a 
                href={`sms:${selectedCustomer.phone}`}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-medium text-sm active:scale-95 transition-transform"
              >
                <MessageCircle className="h-4 w-4" />
                Text
              </a>
              <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-medium text-sm active:scale-95 transition-transform">
                <Edit3 className="h-4 w-4" />
                          </button>
                        </div>
                        
            {/* Tab Navigation */}
            <div className="flex border-b border-gray-100">
              {[
                { id: 'history', label: 'History', icon: Calendar },
                { id: 'photos', label: 'Photos', icon: Image },
                { id: 'notes', label: 'Notes', icon: Edit3 }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setCustomerTab(tab.id as any)}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium border-b-2 transition-colors ${
                    customerTab === tab.id 
                      ? 'border-primary text-primary' 
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto scrollbar-pretty">
              {/* History Tab */}
              {customerTab === 'history' && (
                <div className="divide-y divide-gray-100">
                  {selectedCustomer.visits.map((visit) => (
                    <div key={visit.id} className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="font-medium text-gray-900">{visit.service}</div>
                          <div className="text-sm text-gray-500">
                            {new Date(visit.date).toLocaleDateString('en-US', { 
                              weekday: 'short', 
                              month: 'short', 
                              day: 'numeric' 
                            })} • {visit.duration} min
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-green-600">${visit.price}</div>
                          {visit.rating && renderStars(visit.rating)}
                        </div>
                      </div>

                      {/* Before/After Photos */}
                      {(visit.beforeImage || visit.afterImage) && (
                        <button 
                          onClick={() => setShowImageViewer({ before: visit.beforeImage, after: visit.afterImage })}
                          className="mt-2 flex gap-2 w-full"
                        >
                          {visit.beforeImage && (
                            <div className="relative flex-1">
                              <img 
                                src={visit.beforeImage} 
                                alt="Before" 
                                className="w-full h-20 object-cover rounded-lg"
                              />
                              <span className="absolute bottom-1 left-1 text-[10px] bg-black/60 text-white px-1.5 py-0.5 rounded">Before</span>
                            </div>
                          )}
                          {visit.afterImage && (
                            <div className="relative flex-1">
                              <img 
                                src={visit.afterImage} 
                                alt="After" 
                                className="w-full h-20 object-cover rounded-lg"
                              />
                              <span className="absolute bottom-1 left-1 text-[10px] bg-black/60 text-white px-1.5 py-0.5 rounded">After</span>
                            </div>
                          )}
                        </button>
                      )}

                      {/* Visit Notes */}
                      {visit.notes && (
                        <div className="mt-2 text-sm text-gray-600 bg-gray-50 rounded-lg px-3 py-2">
                          "{visit.notes}"
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Photos Tab - Gallery View */}
              {customerTab === 'photos' && (
                <div className="p-4">
                  <div className="grid grid-cols-3 gap-2">
                    {selectedCustomer.visits
                      .filter(v => v.beforeImage || v.afterImage)
                      .flatMap(v => [
                        v.beforeImage && { url: v.beforeImage, type: 'before', date: v.date, service: v.service },
                        v.afterImage && { url: v.afterImage, type: 'after', date: v.date, service: v.service }
                      ])
                      .filter(Boolean)
                      .map((img: any, i) => (
                        <button 
                          key={i}
                          onClick={() => setShowImageViewer({ before: img.type === 'before' ? img.url : null, after: img.type === 'after' ? img.url : null })}
                          className="relative aspect-square rounded-xl overflow-hidden group"
                        >
                          <img 
                            src={img.url} 
                            alt={`${img.type} - ${img.service}`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                          <span className={`absolute top-2 right-2 text-[10px] px-1.5 py-0.5 rounded font-medium ${
                            img.type === 'after' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-700'
                          }`}>
                            {img.type === 'after' ? '✨ After' : 'Before'}
                          </span>
                        </button>
                      ))}
                  </div>
                  {selectedCustomer.visits.filter(v => v.beforeImage || v.afterImage).length === 0 && (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <Camera className="h-8 w-8 text-gray-400" />
                      </div>
                      <p className="text-gray-500 text-sm">No photos yet</p>
                      <p className="text-gray-400 text-xs mt-1">Take before/after photos at next visit</p>
                    </div>
                  )}
                      </div>
                    )}

              {/* Notes Tab */}
              {customerTab === 'notes' && (
                <div className="p-4 space-y-4">
                  {/* Client Notes */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900 flex items-center gap-2">
                        <Heart className="h-4 w-4 text-pink-500" />
                        Preferences & Notes
                      </h4>
                      <button className="text-xs text-primary font-medium">Edit</button>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-3 text-sm text-gray-700 leading-relaxed">
                      {selectedCustomer.notes || 'No notes added yet. Tap "Edit" to add client preferences.'}
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                      <User className="h-4 w-4 text-primary" />
                      Contact Info
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-700">{selectedCustomer.phone}</span>
                      </div>
                      <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-700">{selectedCustomer.email}</span>
                      </div>
                    </div>
                  </div>

                  {/* Loyalty Stats */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                      <Award className="h-4 w-4 text-amber-500" />
                      Loyalty Status
                    </h4>
                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-100">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-amber-800 font-medium">Gold Member</span>
                        <span className="text-xs bg-amber-200 text-amber-800 px-2 py-0.5 rounded-full font-medium">
                          {selectedCustomer.totalVisits} visits
                        </span>
                      </div>
                      <div className="w-full bg-amber-200 rounded-full h-2 mb-2">
                        <div 
                          className="bg-gradient-to-r from-amber-400 to-amber-500 h-2 rounded-full" 
                          style={{ width: `${Math.min((selectedCustomer.totalVisits / 10) * 100, 100)}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-amber-700">
                        {selectedCustomer.totalVisits >= 10 
                          ? '🎉 VIP unlocked! Enjoy exclusive perks'
                          : `${10 - selectedCustomer.totalVisits} more visits to VIP status`}
                      </p>
                    </div>
                  </div>

                  {/* Danger Zone */}
                  <div className="pt-4 border-t border-gray-100">
                    <button className="flex items-center gap-2 text-red-500 text-sm font-medium">
                      <Ban className="h-4 w-4" />
                      Block Client
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Book Again Button */}
            <div className="p-4 border-t border-gray-100 bg-white">
              <button 
                onClick={() => {
                  setSelectedCustomer(null)
                  setShowAddBooking(true)
                }}
                className="w-full py-3 bg-primary text-white rounded-xl font-medium text-sm flex items-center justify-center gap-2 active:scale-98 transition-transform"
              >
                <Plus className="h-4 w-4" />
                Book New Appointment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Image Viewer Modal */}
      {showImageViewer && (
        <div 
          className="fixed inset-0 bg-black/90 z-[60] flex flex-col"
          onClick={() => setShowImageViewer(null)}
        >
          <div className="flex items-center justify-between p-4">
            <span className="text-white font-medium">Before & After</span>
            <button className="p-2 text-white/80 hover:text-white">
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="flex-1 flex flex-col sm:flex-row items-center justify-center gap-4 p-4">
            {showImageViewer.before && (
              <div className="relative flex-1 max-w-md w-full">
                <img 
                  src={showImageViewer.before} 
                  alt="Before" 
                  className="w-full h-auto rounded-2xl"
                />
                <span className="absolute bottom-4 left-4 text-sm bg-black/60 text-white px-3 py-1 rounded-full">Before</span>
              </div>
            )}
            {showImageViewer.after && (
              <div className="relative flex-1 max-w-md w-full">
                <img 
                  src={showImageViewer.after} 
                  alt="After" 
                  className="w-full h-auto rounded-2xl"
                />
                <span className="absolute bottom-4 left-4 text-sm bg-green-500 text-white px-3 py-1 rounded-full">✨ After</span>
            </div>
          )}
          </div>
      </div>
      )}
    </>
  )
} 
