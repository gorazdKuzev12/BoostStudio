import { useState, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight, Star, Play, Check, Sparkles, Video, Globe, BarChart3, Monitor, Instagram, Facebook, Linkedin, MessageCircle, Users, TrendingUp, Camera, Palette, Target, Eye } from 'lucide-react'
import Link from 'next/link'

// Custom hook for scroll reveal animations
const useScrollReveal = (options = {}) => {
  const ref = useRef(null)
  const [isRevealed, setIsRevealed] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true)
          observer.unobserve(element) // Only animate once
        }
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '0px 0px -50px 0px',
      }
    )

    observer.observe(element)

    return () => {
      if (element) observer.unobserve(element)
    }
  }, [options.threshold, options.rootMargin])

  return [ref, isRevealed]
}

// Reusable ScrollReveal component
const ScrollReveal = ({ 
  children, 
  className = '', 
  variant = 'default', 
  delay = 0,
  threshold = 0.1 
}) => {
  const [ref, isRevealed] = useScrollReveal({ threshold })
  
  const variantClass = {
    default: 'scroll-reveal',
    left: 'scroll-reveal-left',
    right: 'scroll-reveal-right', 
    scale: 'scroll-reveal-scale',
    blur: 'scroll-reveal-blur',
    card: 'scroll-reveal-card',
    hero: 'scroll-reveal-hero',
    bounce: 'scroll-reveal-bounce',
    stagger: 'scroll-reveal-stagger'
  }[variant]

  const delayClass = delay > 0 ? `scroll-reveal-delay-${delay}` : ''

  return (
    <div 
      ref={ref} 
      className={`${variantClass} ${delayClass} ${isRevealed ? 'revealed' : ''} ${className}`}
      style={delay > 6 ? { transitionDelay: `${delay * 0.1}s` } : {}}
    >
      {children}
    </div>
  )
}

// Hover Preview Component for Logo Design
const LogoPreview = ({ children }) => (
  <div className="relative inline-block group/preview">
    {children}
    <div className="absolute left-0 bottom-full mb-3 opacity-0 invisible group-hover/preview:opacity-100 group-hover/preview:visible transition-all duration-300 z-50 transform group-hover/preview:translate-y-0 translate-y-2">
      <div className="w-64 bg-white rounded-xl shadow-2xl border border-gray-100 p-4 relative">
        {/* Arrow */}
        <div className="absolute -bottom-2 left-8 w-4 h-4 bg-white border-r border-b border-gray-100 transform rotate-45"></div>
        
        {/* Logo Mockup - CSS Only */}
        <div className="bg-gradient-to-br from-gray-50 to-white rounded-lg p-5 border border-gray-100">
          <div className="w-16 h-16 mx-auto relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary via-purple-500 to-secondary p-[2px]">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                <span className="text-2xl font-serif font-bold bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent">S</span>
              </div>
            </div>
          </div>
          <div className="mt-3 text-center">
            <span className="text-sm font-semibold text-gray-800">Sarah's Salon</span>
            <div className="text-[9px] text-gray-400 uppercase tracking-widest mt-0.5">Beauty & Wellness</div>
          </div>
        </div>
        <p className="text-[10px] text-gray-400 text-center mt-3">Designed to match your brand ✨</p>
      </div>
    </div>
  </div>
)

// Hover Preview Component for Custom Domain
const HostingPreview = ({ children }) => (
  <div className="relative inline-block group/preview">
    {children}
    <div className="absolute left-0 bottom-full mb-3 opacity-0 invisible group-hover/preview:opacity-100 group-hover/preview:visible transition-all duration-300 z-50 transform group-hover/preview:translate-y-0 translate-y-2">
      <div className="w-72 bg-white rounded-xl shadow-2xl border border-gray-100 p-4 relative">
        {/* Arrow */}
        <div className="absolute -bottom-2 left-8 w-4 h-4 bg-white border-r border-b border-gray-100 transform rotate-45"></div>
        
        {/* Good URL */}
        <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-100 mb-3">
          <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
            <Check className="h-4 w-4 text-white" />
          </div>
          <div>
            <div className="text-[10px] text-green-600 font-medium uppercase tracking-wide">You Get</div>
            <div className="text-sm font-bold text-gray-900">sarahsalon.com</div>
          </div>
        </div>
        
        {/* Bad URL */}
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200 opacity-70 relative overflow-hidden">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full h-[1px] bg-red-400/60"></div>
          </div>
          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
            <span className="text-gray-500 text-sm">✕</span>
          </div>
          <div>
            <div className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">Others Give You</div>
            <div className="text-[10px] text-gray-500">booking-site.com/users/sarah-829</div>
          </div>
        </div>
        
        <p className="text-[10px] text-gray-400 text-center mt-3 italic">Your brand, your domain. Not theirs.</p>
        
        <div className="flex items-center justify-center gap-3 mt-3 pt-3 border-t border-gray-100 text-[10px] text-gray-500">
          <span>🔒 SSL</span>
          <span>⚡ Fast Hosting</span>
          <span>✓ Included</span>
        </div>
      </div>
    </div>
  </div>
)

// Hover Preview Component for Business Card
const BusinessCardPreview = ({ children }) => (
  <div className="relative inline-block group/preview">
    {children}
    <div className="absolute left-0 bottom-full mb-3 opacity-0 invisible group-hover/preview:opacity-100 group-hover/preview:visible transition-all duration-300 z-50 transform group-hover/preview:translate-y-0 translate-y-2">
      <div className="w-72 bg-white rounded-xl shadow-2xl border border-gray-100 p-4 relative">
        {/* Arrow */}
        <div className="absolute -bottom-2 left-8 w-4 h-4 bg-white border-r border-b border-gray-100 transform rotate-45"></div>
        
        {/* Business Card Mockup */}
        <div 
          className="relative bg-gray-900 rounded-lg p-4 shadow-lg"
          style={{ aspectRatio: '1.6/1' }}
        >
          {/* Subtle gradient border */}
          <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary/20 via-transparent to-secondary/20"></div>
          
          {/* Card Content */}
          <div className="relative h-full flex flex-col justify-between">
            {/* Top */}
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <span className="text-white font-serif font-bold text-xs">S</span>
              </div>
              <span className="text-white font-medium text-xs">Sarah's Salon</span>
            </div>
            
            {/* Bottom */}
            <div className="flex items-end justify-between">
              <div className="space-y-0.5">
                <div className="text-[8px] text-gray-400">+1 (555) 123-4567</div>
                <div className="text-[8px] text-primary">sarahsalon.com</div>
              </div>
              
              {/* QR Code */}
              <div className="w-8 h-8 bg-white rounded p-1">
                <div className="w-full h-full grid grid-cols-4 grid-rows-4 gap-[1px]">
                  {[...Array(16)].map((_, i) => (
                    <div key={i} className={`${[0,1,3,4,6,9,11,12,14,15].includes(i) ? 'bg-gray-900' : 'bg-gray-200'}`}></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <p className="text-[10px] text-gray-400 text-center mt-3">Print-ready with QR code 📇</p>
      </div>
    </div>
  </div>
)

// Hover Preview Component for Photo Dump Strategy
const PhotoDumpPreview = ({ children }) => (
  <div className="relative inline-block group/preview">
    {children}
    <div className="absolute left-0 bottom-full mb-3 opacity-0 invisible group-hover/preview:opacity-100 group-hover/preview:visible transition-all duration-300 z-50 transform group-hover/preview:translate-y-0 translate-y-2">
      <div className="w-72 bg-white rounded-xl shadow-2xl border border-gray-100 p-4 relative">
        {/* Arrow */}
        <div className="absolute -bottom-2 left-8 w-4 h-4 bg-white border-r border-b border-gray-100 transform rotate-45"></div>
        
        {/* Google Maps Photo Grid */}
        <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-5 h-5 bg-blue-500 rounded flex items-center justify-center">
              <span className="text-white text-[10px] font-bold">G</span>
            </div>
            <span className="text-xs font-medium text-gray-700">Google Maps Photos</span>
          </div>
          <div className="grid grid-cols-4 gap-1">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="aspect-square rounded bg-gradient-to-br from-pink-200 to-purple-200 flex items-center justify-center">
                <span className="text-[10px]">{['💅', '✨', '💇‍♀️', '🌸'][i]}</span>
              </div>
            ))}
          </div>
          <div className="mt-2 flex items-center gap-1">
            <span className="text-[10px] text-green-600 font-medium">+4 new this month</span>
            <Check className="h-3 w-3 text-green-600" />
          </div>
        </div>
        <p className="text-[10px] text-gray-500 text-center mt-3">Google ranks active profiles higher 📸</p>
      </div>
    </div>
  </div>
)

// Hover Preview Component for Google Updates Post
const GoogleUpdatePreview = ({ children }) => (
  <div className="relative inline-block group/preview">
    {children}
    <div className="absolute left-0 bottom-full mb-3 opacity-0 invisible group-hover/preview:opacity-100 group-hover/preview:visible transition-all duration-300 z-50 transform group-hover/preview:translate-y-0 translate-y-2">
      <div className="w-72 bg-white rounded-xl shadow-2xl border border-gray-100 p-4 relative">
        {/* Arrow */}
        <div className="absolute -bottom-2 left-8 w-4 h-4 bg-white border-r border-b border-gray-100 transform rotate-45"></div>
        
        {/* Google Update Post Mockup */}
        <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-5 h-5 bg-blue-500 rounded flex items-center justify-center">
              <span className="text-white text-[10px] font-bold">G</span>
            </div>
            <span className="text-xs font-medium text-gray-700">Google Business Update</span>
          </div>
          <div className="bg-white rounded-lg p-2 border border-gray-100">
            <div className="w-full h-16 bg-gradient-to-br from-pink-100 to-purple-100 rounded mb-2 flex items-center justify-center">
              <span className="text-2xl">💅✨</span>
            </div>
            <p className="text-[10px] text-gray-600 mb-2">New slots open for December! Book your holiday lashes now 🎄</p>
            <div className="bg-primary text-white text-[9px] font-medium py-1 px-2 rounded text-center">
              Book Online →
            </div>
          </div>
        </div>
        <p className="text-[10px] text-gray-500 text-center mt-3">Posted monthly to keep profile active 📍</p>
      </div>
    </div>
  </div>
)

// Hover Preview Component for Smart Reputation Guard
const ReputationGuardPreview = ({ children }) => (
  <div className="relative inline-block group/preview">
    {children}
    <div className="absolute left-0 bottom-full mb-3 opacity-0 invisible group-hover/preview:opacity-100 group-hover/preview:visible transition-all duration-300 z-50 transform group-hover/preview:translate-y-0 translate-y-2">
      <div className="w-80 bg-white rounded-xl shadow-2xl border border-gray-100 p-4 relative">
        {/* Arrow */}
        <div className="absolute -bottom-2 left-8 w-4 h-4 bg-white border-r border-b border-gray-100 transform rotate-45"></div>
        
        {/* Email Flow Mockup */}
        <div className="space-y-3">
          <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
            <p className="text-[10px] text-gray-500 mb-2">After appointment, client receives:</p>
            <div className="bg-white rounded-lg p-3 border border-gray-100">
              <p className="text-xs font-medium text-gray-700 mb-2">How was your visit? 💅</p>
              <div className="flex gap-1 justify-center">
                {[1,2,3,4,5].map((star) => (
                  <div key={star} className="w-8 h-8 bg-yellow-100 rounded flex items-center justify-center cursor-pointer hover:bg-yellow-200 transition-colors">
                    <span className="text-lg">⭐</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex gap-2">
            <div className="flex-1 bg-green-50 rounded-lg p-2 border border-green-200">
              <p className="text-[10px] font-medium text-green-700 mb-1">5 Stars →</p>
              <p className="text-[9px] text-green-600">Redirect to Google Review</p>
            </div>
            <div className="flex-1 bg-orange-50 rounded-lg p-2 border border-orange-200">
              <p className="text-[10px] font-medium text-orange-700 mb-1">1-4 Stars →</p>
              <p className="text-[9px] text-orange-600">Private feedback form</p>
            </div>
          </div>
        </div>
        <p className="text-[10px] text-gray-500 text-center mt-3">4.9⭐ salons rank higher than 4.5⭐ on Google Maps</p>
      </div>
    </div>
  </div>
)

// Hover Preview Component for Birthday Gift
const BirthdayGiftPreview = ({ children }) => (
  <div className="relative inline-block group/preview">
    {children}
    <div className="absolute left-0 bottom-full mb-3 opacity-0 invisible group-hover/preview:opacity-100 group-hover/preview:visible transition-all duration-300 z-50 transform group-hover/preview:translate-y-0 translate-y-2">
      <div className="w-72 bg-white rounded-xl shadow-2xl border border-gray-100 p-4 relative">
        {/* Arrow */}
        <div className="absolute -bottom-2 left-8 w-4 h-4 bg-white border-r border-b border-gray-100 transform rotate-45"></div>
        
        {/* Birthday Email Mockup */}
        <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-lg p-3 border border-pink-200">
          <div className="text-center mb-2">
            <span className="text-3xl">🎂</span>
          </div>
          <div className="bg-white rounded-lg p-3 border border-gray-100 text-center">
            <p className="text-xs font-bold text-gray-800 mb-1">Happy Birthday Sarah! 🎉</p>
            <p className="text-[10px] text-gray-600 mb-2">Here's 15% off your next visit</p>
            <div className="bg-gradient-to-r from-primary to-secondary text-white text-[10px] font-medium py-1.5 px-3 rounded-lg inline-block">
              BDAY15
            </div>
          </div>
          <p className="text-[9px] text-gray-500 text-center mt-2">Auto-sent 3 days before birthday</p>
        </div>
        <p className="text-[10px] text-gray-500 text-center mt-3">Set it once, runs forever 🔄</p>
      </div>
    </div>
  </div>
)

// Hover Preview Component for Flash Sale
const FlashSalePreview = ({ children }) => (
  <div className="relative inline-block group/preview">
    {children}
    <div className="absolute left-0 bottom-full mb-3 opacity-0 invisible group-hover/preview:opacity-100 group-hover/preview:visible transition-all duration-300 z-50 transform group-hover/preview:translate-y-0 translate-y-2">
      <div className="w-72 bg-white rounded-xl shadow-2xl border border-gray-100 p-4 relative">
        {/* Arrow */}
        <div className="absolute -bottom-2 left-8 w-4 h-4 bg-white border-r border-b border-gray-100 transform rotate-45"></div>
        
        {/* Flash Sale Mockup */}
        <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-lg p-3 border border-red-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xl">⚡</span>
            <span className="bg-red-500 text-white text-[9px] font-bold px-2 py-0.5 rounded">48H ONLY</span>
          </div>
          <div className="bg-white rounded-lg p-3 border border-gray-100">
            <p className="text-xs font-bold text-gray-800 mb-1">Empty slots this Thursday!</p>
            <p className="text-[10px] text-gray-600 mb-2">20% off lash fills — only 3 spots left</p>
            <div className="bg-red-500 text-white text-[10px] font-medium py-1.5 px-3 rounded-lg text-center">
              Book Now →
            </div>
          </div>
        </div>
        <p className="text-[10px] text-gray-500 text-center mt-3">Fill empty calendar slots instantly 📅</p>
      </div>
    </div>
  </div>
)

// Hover Preview Component for Win-Back Bot
const WinBackPreview = ({ children }) => (
  <div className="relative inline-block group/preview">
    {children}
    <div className="absolute left-0 bottom-full mb-3 opacity-0 invisible group-hover/preview:opacity-100 group-hover/preview:visible transition-all duration-300 z-50 transform group-hover/preview:translate-y-0 translate-y-2">
      <div className="w-72 bg-white rounded-xl shadow-2xl border border-gray-100 p-4 relative">
        {/* Arrow */}
        <div className="absolute -bottom-2 left-8 w-4 h-4 bg-white border-r border-b border-gray-100 transform rotate-45"></div>
        
        {/* Win-Back Email Mockup */}
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-3 border border-purple-200">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">🧟‍♀️</span>
            <span className="text-[10px] text-purple-600 font-medium">Auto-triggered after 60 days inactive</span>
          </div>
          <div className="bg-white rounded-lg p-3 border border-gray-100">
            <p className="text-xs font-bold text-gray-800 mb-1">We miss you! 💕</p>
            <p className="text-[10px] text-gray-600 mb-2">It's been a while since your last lash fill. Come back for 10% off!</p>
            <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white text-[10px] font-medium py-1.5 px-3 rounded-lg text-center">
              Book Your Comeback →
            </div>
          </div>
        </div>
        <p className="text-[10px] text-gray-500 text-center mt-3">Bring back "ghost" clients automatically 👻</p>
      </div>
    </div>
  </div>
)

export default function Home() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [portfolioFilter, setPortfolioFilter] = useState('all')

  const testimonials = [
    {
      name: "Sarah M.",
      business: "Luxe Nails Studio",
      quote: "GlowBoost doubled my bookings in just 2 months! The videos are absolutely stunning.",
      rating: 5,
      result: "+150% bookings"
    },
    {
      name: "Emma L.",
      business: "Lash Lounge",
      quote: "Professional landing page and ads that actually convert. Worth every penny!",
      rating: 5,
      result: "+200% online presence"
    },
    {
      name: "Maria R.",
      business: "Beauty Bar",
      quote: "Finally, marketing that works! My Instagram is now bringing in 15+ new clients monthly.",
      rating: 5,
      result: "+400% social engagement"
    }
  ]

  const portfolioItems = [
    {
      type: "video",
      category: "nail-salon",
      thumbnail: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=600&h=400&fit=crop",
      title: "Nail Art Showcase",
      description: "Promotional video campaign for luxury nail salon",
      client: "Luxe Nails Studio",
      results: "300% increase in bookings"
    },
    {
      type: "video", 
      category: "lash-studio",
      thumbnail: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=400&fit=crop",
      title: "Lash Extension Process",
      description: "Behind-the-scenes educational content series",
      client: "Lash Lounge",
      results: "250% social media growth"
    },
    {
      type: "landing-page",
      category: "spa",
      thumbnail: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&h=400&fit=crop",
      title: "Spa Landing Page",
      description: "Complete brand identity & booking platform",
      client: "Serenity Spa",
      results: "180% conversion rate"
    },
    {
      type: "campaign",
      category: "nail-salon", 
      thumbnail: "https://images.unsplash.com/photo-1604654894610-df63bc138cc8?w=600&h=400&fit=crop",
      title: "Instagram Ad Campaign",
      description: "Multi-platform advertising strategy",
      client: "Glamour Nails",
      results: "500% ROI"
    },
    {
      type: "video",
      category: "beauty-clinic",
      thumbnail: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=600&h=400&fit=crop", 
      title: "Beauty Treatment Series",
      description: "Educational content & brand storytelling",
      client: "Elite Beauty Clinic",
      results: "400% engagement"
    },
    {
      type: "branding",
      category: "lash-studio",
      thumbnail: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&h=400&fit=crop",
      title: "Complete Rebrand",
      description: "Brand strategy, visual identity & digital presence",
      client: "Bella Lashes",
      results: "350% brand recognition"
    }
  ]

  const filteredPortfolio = portfolioFilter === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === portfolioFilter)

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <div className="min-h-screen bg-slate-light font-jakarta overflow-x-hidden">
      {/* Navigation */}
      <nav className="glass-effect fixed w-full top-0 z-50 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3 group cursor-pointer">
              <div className="bg-gradient-to-br from-primary to-secondary p-2.5 rounded-xl shadow-glow group-hover:shadow-glow-lg transition-all duration-500 group-hover:scale-110">
                <Sparkles className="h-6 w-6 text-white animate-pulse-soft" />
              </div>
              <span className="text-2xl font-bold text-slate-dark">GlowBoost<span className="gradient-text-animated">Studio</span></span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#services" className="text-slate-dark/80 hover:text-primary transition-all duration-300 font-medium animated-underline">Services</a>
              <a href="#pricing" className="text-slate-dark/80 hover:text-primary transition-all duration-300 font-medium animated-underline">Pricing</a>
              <a href="#portfolio" className="text-slate-dark/80 hover:text-primary transition-all duration-300 font-medium animated-underline">Portfolio</a>
              <a href="#testimonials" className="text-slate-dark/80 hover:text-primary transition-all duration-300 font-medium animated-underline">Reviews</a>
              <Link href="/login" className="text-slate-dark/80 hover:text-primary transition-all duration-300 font-medium animated-underline">Login</Link>
            </div>
            <Link href="/create-landing-page" className="relative bg-gradient-to-r from-primary via-secondary to-accent text-white px-8 py-3 rounded-xl font-semibold overflow-hidden group btn-glow">
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary-dark via-secondary-dark to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section - Premium Split Screen */}
      <section className="pt-24 lg:pt-32 pb-16 lg:pb-24 min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-50/80 via-pink-50/60 to-white grain-overlay">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 aurora-bg"></div>
        <div className="absolute inset-0 grid-pattern opacity-50"></div>
        
        {/* Floating Gradient Orbs */}
        <div className="gradient-orb w-[500px] h-[500px] bg-gradient-to-br from-primary/25 to-secondary/15 top-10 -left-20" style={{ animationDelay: '0s' }}></div>
        <div className="gradient-orb w-[400px] h-[400px] bg-gradient-to-br from-secondary/20 to-purple-400/15 bottom-20 right-0" style={{ animationDelay: '2s' }}></div>
        <div className="gradient-orb w-[300px] h-[300px] bg-gradient-to-br from-pink-300/20 to-primary/10 top-1/2 left-1/4" style={{ animationDelay: '4s' }}></div>
        
        {/* Decorative Shapes */}
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
        
        {/* Light rays effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-conic from-primary/5 via-transparent to-secondary/5 blur-3xl opacity-60"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left Side - Content */}
            <div className="order-2 lg:order-1 animate-fade-in-up mt-6 lg:mt-0 relative z-10">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-primary/20 rounded-full px-4 py-2 mb-6 shadow-lg shadow-primary/5 animate-bounce-gentle">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                <span className="text-sm font-medium text-slate-dark">Now accepting new clients</span>
              </div>
            
              {/* Headline */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-dark mb-6 leading-[1.1] tracking-tight">
                Your Personal Digital Agency
              <br />
                <span className="gradient-text-animated inline-block mt-2">
                  for the cost of just one appointment.
                </span>
            </h1>
            
              {/* Subhead */}
              <p className="text-base md:text-lg text-gray-600 mb-8 leading-relaxed max-w-lg">
                We design your professional website, train your AI receptionist, automate your bookings, manage your CRM, and handle all the tech. 
                <span className="font-semibold text-slate-dark"> Stop juggling tools and freelancers.</span>
              </p>
              
              {/* Features - Premium Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                <div className="flex items-center gap-3 bg-white/60 backdrop-blur-sm rounded-xl p-3 border border-white/50 hover:border-primary/30 hover:bg-white/80 transition-all duration-300 group cursor-default">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <span className="text-lg">🌐</span>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-dark text-sm block">Free Custom Domain</span>
                    <span className="text-gray-500 text-xs">YourSalon.com included</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white/60 backdrop-blur-sm rounded-xl p-3 border border-white/50 hover:border-primary/30 hover:bg-white/80 transition-all duration-300 group cursor-default">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <span className="text-lg">📅</span>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-dark text-sm block">24/7 Auto-Booking</span>
                    <span className="text-gray-500 text-xs">Syncs with your phone</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white/60 backdrop-blur-sm rounded-xl p-3 border border-white/50 hover:border-primary/30 hover:bg-white/80 transition-all duration-300 group cursor-default">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <span className="text-lg">🧠</span>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-dark text-sm block">AI Receptionist</span>
                    <span className="text-gray-500 text-xs">Never miss a client</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white/60 backdrop-blur-sm rounded-xl p-3 border border-white/50 hover:border-primary/30 hover:bg-white/80 transition-all duration-300 group cursor-default">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <span className="text-lg">💳</span>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-dark text-sm block">Direct Payments</span>
                    <span className="text-gray-500 text-xs">Stripe pays YOU directly</span>
                  </div>
                </div>
              </div>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/create-landing-page" className="relative group bg-gradient-to-r from-primary via-secondary to-accent text-white px-8 py-4 rounded-2xl text-base font-semibold text-center overflow-hidden btn-glow">
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Get Started Now
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-dark via-secondary-dark to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
                <button className="group glass-effect text-slate-dark px-8 py-4 rounded-2xl text-base font-semibold hover:bg-white/90 transition-all duration-300 flex items-center justify-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:shadow-glow transition-all duration-300">
                    <Play className="h-4 w-4 text-white ml-0.5" />
                  </div>
                  Watch Demo
                </button>
              </div>
              
              {/* Social Proof */}
              <div className="flex items-center gap-4 mt-8 pt-8 border-t border-gray-200/50">
                <div className="flex -space-x-3">
                  {['🧑‍💼', '👩‍💼', '👨‍💼', '👩‍🦰'].map((emoji, i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 border-2 border-white flex items-center justify-center text-lg shadow-md">
                      {emoji}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600"><span className="font-semibold text-slate-dark">50+</span> beauty pros trust us</p>
                </div>
              </div>
            </div>
            
            {/* Right Side - Laptop Mockup with Video */}
            <div className="order-1 lg:order-2 flex justify-center lg:justify-end lg:-mt-12 relative z-10">
              <div className="relative w-full max-w-xl lg:max-w-2xl">
                {/* Glow behind laptop */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-secondary/20 to-accent/30 blur-3xl scale-110 animate-pulse-soft"></div>
                
                {/* Laptop Frame */}
                <div className="relative group">
                  {/* Screen Bezel */}
                  <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-t-3xl p-3 pb-0 shadow-2xl">
                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-gray-800 rounded-b-xl flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-gray-600"></div>
                    </div>
                    
                    {/* Browser Chrome */}
                    <div className="bg-gray-800/80 rounded-t-xl px-4 py-2.5 flex items-center gap-2 border-b border-gray-700/50">
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors cursor-pointer"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors cursor-pointer"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors cursor-pointer"></div>
                      </div>
                      <div className="flex-1 mx-4">
                        <div className="bg-gray-700/80 rounded-lg px-4 py-1.5 text-xs text-gray-300 truncate flex items-center gap-2 border border-gray-600/30">
                          <svg className="w-3 h-3 text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
                          glowbooststudio.com
                        </div>
                      </div>
                    </div>
                    
                    {/* Video Container */}
                    <div className="bg-white rounded-b-lg overflow-hidden aspect-video relative">
                      <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                      >
                        <source src="/video.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                      {/* Reflection overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none"></div>
                    </div>
                  </div>
                  
                  {/* Laptop Base */}
                  <div className="bg-gradient-to-b from-gray-800 to-gray-900 h-5 rounded-b-lg"></div>
                  <div className="bg-gradient-to-b from-gray-700 to-gray-800 h-2 mx-16 rounded-b-2xl shadow-inner"></div>
                  
                  {/* Keyboard hint */}
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-12 h-1 bg-gray-600 rounded-full"></div>
                  
                  {/* Shadow */}
                  <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-4/5 h-10 bg-black/25 blur-2xl rounded-full"></div>
                </div>
                
                {/* Floating Elements - Enhanced */}
                <div className="absolute -top-6 -right-6 glass-effect rounded-2xl p-4 animate-float shadow-card-hover border border-white/30">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/30">
                      <Check className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">New Booking</p>
                      <p className="text-sm font-bold text-slate-dark">Sarah M.</p>
                    </div>
                  </div>
                </div>
                
                <div className="absolute -bottom-4 -left-6 glass-effect rounded-2xl p-4 animate-float-delayed shadow-card-hover border border-white/30">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-secondary rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30">
                      <MessageCircle className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">AI Replied</p>
                      <p className="text-sm font-bold text-slate-dark">"Price sent!"</p>
                    </div>
                  </div>
                </div>
                
                {/* New floating element - Stats */}
                <div className="absolute top-1/2 -right-12 glass-effect rounded-2xl p-3 animate-float-slow shadow-card-hover border border-white/30 hidden lg:block" style={{ animationDelay: '3s' }}>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary to-pink-500 rounded-lg flex items-center justify-center">
                      <TrendingUp className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-primary">+127%</p>
                      <p className="text-[10px] text-gray-500">Bookings</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* Enhanced Services Section */}
      <section id="services" className="py-24 bg-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-full dot-pattern opacity-30"></div>
        <div className="absolute top-20 right-0 w-96 h-96 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-0 w-80 h-80 bg-gradient-to-br from-secondary/5 to-accent/5 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal variant="blur" className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-full px-6 py-2.5 mb-6 border border-primary/10">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-primary font-semibold text-sm tracking-wide">What We Build For You</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-dark mb-6 tracking-tight">
              Beauty Tech That Works <br className="hidden sm:block" />
              <span className="gradient-text">While You Sleep</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Automation, aesthetics, and results—everything a modern salon owner needs to scale.
            </p>
          </ScrollReveal>

          {/* Service Categories */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
            {/* Digital Storefront Design */}
            <ScrollReveal variant="card" delay={1}>
            <div className="group h-full">
              <div className="relative bg-white rounded-3xl p-8 lg:p-10 card-glow transition-all duration-500 border border-gray-100/80 h-full overflow-hidden">
                {/* Gradient accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="flex items-center mb-8">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity"></div>
                    <div className="relative bg-gradient-to-br from-primary/10 to-primary/5 w-16 h-16 rounded-2xl flex items-center justify-center mr-6 border border-primary/10 group-hover:scale-110 transition-transform duration-500">
                      <Palette className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl lg:text-2xl font-bold text-slate-dark mb-1">Digital Storefront Design</h3>
                    <p className="text-gray-500 text-sm">Aesthetic • Branding • Mobile-First</p>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed mb-6">
                  We don't just build "websites"—we build high-end digital storefronts that match your salon's vibe. From custom logo design to a mobile-perfect layout, we ensure you look like the premium choice in your city.
                </p>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-primary" />
                    <span>Custom Logo & Business Card Design included</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-primary" />
                    <span>Mobile-First Layout (Optimized for Instagram bios)</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-primary" />
                    <span>High-End Portfolio Gallery to showcase your work</span>
                  </li>
                </ul>
              </div>
            </div>
            </ScrollReveal>

            {/* 24/7 Booking Automation */}
            <ScrollReveal variant="card" delay={2}>
            <div className="group h-full">
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-10 card-shadow group-hover:card-shadow-hover transition-all duration-500 border border-gray-100 h-full">
                <div className="flex items-center mb-8">
                  <div className="bg-gradient-to-br from-secondary/10 to-secondary/5 w-16 h-16 rounded-2xl flex items-center justify-center mr-6">
                    <Globe className="h-8 w-8 text-secondary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-dark mb-2">24/7 Booking Automation</h3>
                    <p className="text-gray-600">Calendar | Sync | Payments</p>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Stop playing phone tag. Our system acts as your 24/7 receptionist, letting clients see your availability and book instantly. It syncs directly with your iPhone/Google Calendar so you never get double-booked.
                </p>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-secondary" />
                    <span>Auto-Syncs with your personal phone calendar</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-secondary" />
                    <span>SMS Reminders to reduce no-shows</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-secondary" />
                    <span>Google Maps Integration ("Book Now" button)</span>
                  </li>
                </ul>
              </div>
            </div>
            </ScrollReveal>

            {/* The AI Receptionist */}
            <ScrollReveal variant="card" delay={3}>
            <div className="group h-full">
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-10 card-shadow group-hover:card-shadow-hover transition-all duration-500 border border-gray-100 h-full">
                <div className="flex items-center mb-8">
                  <div className="bg-gradient-to-br from-primary/10 to-primary/5 w-16 h-16 rounded-2xl flex items-center justify-center mr-6">
                    <MessageCircle className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-dark mb-2">The AI Receptionist</h3>
                    <p className="text-gray-600">Auto-Replies | FAQ | 24/7 Support</p>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Our AI developer trains a custom AI specifically for your salon. It sits on your website and answers questions like "How much for a full set?" or "Where do I park?" instantly, capturing clients while you sleep.
                </p>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-primary" />
                    <span>Trained on your specific Price List</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-primary" />
                    <span>Filters out "Time Waster" DMs</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-primary" />
                    <span>Instant replies even at 2:00 AM</span>
                  </li>
                </ul>
              </div>
            </div>
            </ScrollReveal>

            {/* Viral Content & Growth */}
            <ScrollReveal variant="card" delay={4}>
            <div className="group h-full">
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-10 card-shadow group-hover:card-shadow-hover transition-all duration-500 border border-gray-100 h-full">
                <div className="flex items-center mb-8">
                  <div className="bg-gradient-to-br from-secondary/10 to-secondary/5 w-16 h-16 rounded-2xl flex items-center justify-center mr-6">
                    <Video className="h-8 w-8 text-secondary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-dark mb-2">Viral Content & Growth</h3>
                    <p className="text-gray-600">Editing | Reels | SEO</p>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed mb-6">
                  <span className="bg-gold/20 text-gold px-2 py-0.5 rounded text-sm font-semibold">VIP Only</span> You film the content on your phone, and we turn it into professional Reels/TikToks. Plus, we optimize your Google Profile to ensure you rank #1 when people search "Best Lash Tech in [City]."
                </p>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-secondary" />
                    <span>Professional Video Editing (Reels & TikToks)</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-secondary" />
                    <span>Google Maps SEO to rank higher</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-secondary" />
                    <span>Paid Ad Setup (to fill empty slots fast)</span>
                  </li>
                </ul>
              </div>
            </div>
            </ScrollReveal>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-16 border-t border-gray-100">
            <ScrollReveal variant="bounce" delay={1}>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">48h</div>
                <div className="text-gray-600">Average Setup Time</div>
              </div>
            </ScrollReveal>
            <ScrollReveal variant="bounce" delay={2}>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary mb-2">15+</div>
                <div className="text-gray-600">Salons Automated</div>
              </div>
            </ScrollReveal>
            <ScrollReveal variant="bounce" delay={3}>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                <div className="text-gray-600">AI Availability</div>
              </div>
            </ScrollReveal>
            <ScrollReveal variant="bounce" delay={4}>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary mb-2">0</div>
                <div className="text-gray-600">Phone Tag Required</div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/20 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 grid-pattern opacity-30"></div>
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-primary/10 via-secondary/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-secondary/10 via-accent/5 to-transparent rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal variant="blur" className="text-center mb-16">
            <div className="inline-flex items-center gap-2 glass-effect rounded-full px-6 py-2.5 mb-6 border border-white/50 shadow-lg">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span className="text-primary font-semibold text-sm tracking-wide">Pricing Plans</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-dark mb-6 tracking-tight">
              Simple, <span className="gradient-text">Transparent</span> Pricing
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Choose the perfect plan to grow your beauty business
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto items-stretch">
            {/* Essential Plan */}
            <ScrollReveal variant="scale" delay={1}>
            <div className="relative bg-white rounded-3xl p-8 shadow-lg border border-gray-100/80 h-full overflow-hidden">
              
              <div className="text-center mb-8 relative z-10">
                <div className="relative mx-auto w-fit mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-400 to-gray-600 rounded-2xl blur-lg opacity-20"></div>
                  <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 w-16 h-16 rounded-2xl flex items-center justify-center">
                    <Monitor className="h-8 w-8 text-slate-dark" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-slate-dark mb-2">The Essential</h3>
                <p className="text-sm text-gray-500 mb-4">Best for new solo artists</p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-5xl font-bold text-slate-dark">$49</span>
                  <span className="text-lg text-gray-500 font-normal">/month</span>
                </div>
                <p className="text-sm text-gray-500 mt-2">+ $199 one-time setup fee</p>
              </div>
              <ul className="space-y-4 mb-10">
                <li className="flex items-start gap-3">
                  <div className="bg-green-100 rounded-full p-1 mt-0.5">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">💻 High-End Website</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-green-100 rounded-full p-1 mt-0.5">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">🔗 "Book Now" Button (Phone/DM)</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-green-100 rounded-full p-1 mt-0.5">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">📱 Mobile Optimized</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-green-100 rounded-full p-1 mt-0.5">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">🔍 SEO Optimized (Rank on Google)</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-green-100 rounded-full p-1 mt-0.5">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <HostingPreview>
                    <span className="text-gray-700 border-b border-dashed border-gray-400 cursor-pointer hover:text-primary hover:border-primary transition-colors inline-flex items-center gap-1.5">
                      🌐 Free Custom Domain
                      <Eye className="h-3.5 w-3.5 text-gray-400" />
                    </span>
                  </HostingPreview>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-green-100 rounded-full p-1 mt-0.5">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <LogoPreview>
                    <span className="text-gray-700 border-b border-dashed border-gray-400 cursor-pointer hover:text-primary hover:border-primary transition-colors inline-flex items-center gap-1.5">
                      🎨 Custom Logo Design
                      <Eye className="h-3.5 w-3.5 text-gray-400" />
                    </span>
                  </LogoPreview>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-green-100 rounded-full p-1 mt-0.5">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <BusinessCardPreview>
                    <span className="text-gray-700 border-b border-dashed border-gray-400 cursor-pointer hover:text-primary hover:border-primary transition-colors inline-flex items-center gap-1.5">
                      📇 Business Card Design (QR code)
                      <Eye className="h-3.5 w-3.5 text-gray-400" />
                    </span>
                  </BusinessCardPreview>
                </li>
              </ul>
              <button className="w-full bg-gray-800 text-white py-4 rounded-2xl font-semibold text-lg">
                Get Started
              </button>
            </div>
            </ScrollReveal>

            {/* Auto-Booker Plan */}
            <ScrollReveal variant="scale" delay={2}>
            <div className="relative bg-white rounded-3xl p-8 pt-12 h-full overflow-visible shadow-xl shadow-primary/10">
              {/* Gradient border */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent rounded-3xl p-[2px]">
                <div className="absolute inset-[2px] bg-white rounded-[22px]"></div>
              </div>
              
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 z-20">
                <span className="bg-gradient-to-r from-primary via-secondary to-accent text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-primary/30 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  RECOMMENDED
                </span>
              </div>
              <div className="text-center mb-8 relative z-10">
                <div className="relative mx-auto w-fit mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-2xl blur-xl opacity-50 animate-pulse-soft"></div>
                  <div className="relative bg-gradient-to-br from-primary via-secondary to-accent w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg">
                    <BarChart3 className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-slate-dark mb-2">The Auto-Booker</h3>
                <p className="text-sm text-gray-500 mb-4">Stop playing "Phone Tag"</p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-5xl font-bold gradient-text">$99</span>
                  <span className="text-lg text-gray-500 font-normal">/month</span>
                </div>
                <div className="mt-2 inline-flex items-center gap-2 bg-green-50 text-green-600 px-3 py-1 rounded-full text-sm font-semibold">
                  <span>🎉</span>
                  <span className="line-through text-gray-400 text-xs">$199</span>
                  <span>Setup Fee WAIVED</span>
                </div>
              </div>
              <ul className="space-y-4 mb-10 relative z-10">
                <li className="flex items-start gap-3">
                  <div className="bg-green-100 rounded-full p-1 mt-0.5">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">✅ Everything in Essential</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-green-100 rounded-full p-1 mt-0.5">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">📅 Auto-Booking System (24/7)</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-green-100 rounded-full p-1 mt-0.5">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">🤖 AI Receptionist</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-green-100 rounded-full p-1 mt-0.5">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">📲 SMS Reminders</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-green-100 rounded-full p-1 mt-0.5">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">📍 Google Maps "Book" Button</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-green-100 rounded-full p-1 mt-0.5">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">💳 Stripe Payments (Direct to You)</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-green-100 rounded-full p-1 mt-0.5">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">📸 Client History & Before/After Photos</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-green-100 rounded-full p-1 mt-0.5">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">👥 Up to 5 Team Members</span>
                </li>
              </ul>
              <p className="text-[10px] text-gray-400 text-center -mt-6 mb-4 relative z-10">💡 Payments go directly to your Stripe — we never hold your money.</p>
              <button className="relative z-10 w-full bg-gradient-to-r from-primary to-secondary text-white py-4 rounded-2xl font-semibold text-lg">
                Start This Week
              </button>
              <p className="text-center text-xs text-gray-500 mt-3 relative z-10">Limited time: No setup fee!</p>
            </div>
            </ScrollReveal>

            {/* Viral VIP Plan */}
            <ScrollReveal variant="scale" delay={3}>
            <div className="relative bg-gradient-to-br from-amber-50/50 to-yellow-50/30 rounded-3xl p-8 pt-12 shadow-lg border-2 border-gold/30 h-full overflow-visible">
              
              {/* VIP Badge */}
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 z-20">
                <span className="bg-gradient-to-r from-gold via-yellow-400 to-amber-500 text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-gold/30 flex items-center gap-2">
                  <Star className="w-4 h-4 fill-white" />
                  VIP
                </span>
              </div>
              <div className="text-center mb-6 relative z-10">
                <div className="relative mx-auto w-fit mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-gold to-amber-500 rounded-2xl blur-xl opacity-40 animate-pulse-soft"></div>
                  <div className="relative bg-gradient-to-br from-gold via-yellow-400 to-amber-500 w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg">
                    <Star className="h-8 w-8 text-white fill-white/50" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-slate-dark mb-2">The Viral VIP</h3>
                <p className="text-sm text-gray-500 mb-4">Rank #1 on Google Maps</p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-5xl font-bold bg-gradient-to-r from-gold to-amber-600 bg-clip-text text-transparent">$249</span>
                  <span className="text-lg text-gray-500 font-normal">/month</span>
                </div>
                <div className="mt-2 inline-flex items-center gap-2 bg-green-50 text-green-600 px-3 py-1 rounded-full text-sm font-semibold">
                  <span>🎉</span>
                  <span className="line-through text-gray-400 text-xs">$299</span>
                  <span>Setup Fee WAIVED</span>
                </div>
              </div>
              
              {/* SEO Secret Callout */}
              <div className="bg-gradient-to-r from-gold/10 to-yellow-100 rounded-xl p-3 mb-5 border border-gold/20">
                <p className="text-xs text-gray-700">
                  <span className="font-bold text-gold">🤫 Secret:</span> For salons, SEO = <span className="font-semibold">Google Maps ranking</span>, not blogs.
                </p>
              </div>

              <ul className="space-y-3 mb-5">
                <li className="flex items-start gap-3">
                  <div className="bg-green-100 rounded-full p-1 mt-0.5">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">✅ Everything in Auto-Booker</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-green-100 rounded-full p-1 mt-0.5">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">👥 Unlimited Team Members</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-green-100 rounded-full p-1 mt-0.5">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">👑 Priority WhatsApp Support</span>
                </li>
              </ul>

              {/* Maps Boost Section */}
              <div className="border-t border-gray-100 pt-4 mb-4">
                <h4 className="text-xs font-bold text-slate-dark mb-3">📍 The "Maps" Boost <span className="bg-green-100 text-green-600 px-1.5 py-0.5 rounded text-[10px] ml-1">MONTHLY</span></h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="bg-green-100 rounded-full p-1 mt-0.5">
                      <Check className="h-4 w-4 text-green-600" />
                    </div>
                    <PhotoDumpPreview>
                      <span className="text-gray-700 border-b border-dashed border-gray-400 cursor-pointer hover:text-gold hover:border-gold transition-colors inline-flex items-center gap-1.5">
                        📸 4 Photos Uploaded Monthly
                        <Eye className="h-3.5 w-3.5 text-gray-400" />
                      </span>
                    </PhotoDumpPreview>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-green-100 rounded-full p-1 mt-0.5">
                      <Check className="h-4 w-4 text-green-600" />
                    </div>
                    <GoogleUpdatePreview>
                      <span className="text-gray-700 border-b border-dashed border-gray-400 cursor-pointer hover:text-gold hover:border-gold transition-colors inline-flex items-center gap-1.5">
                        📍 Monthly "Book Now" Post
                        <Eye className="h-3.5 w-3.5 text-gray-400" />
                      </span>
                    </GoogleUpdatePreview>
                  </li>
                </ul>
              </div>

              {/* Star System Section */}
              <div className="border-t border-gray-100 pt-4 mb-4">
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="bg-green-100 rounded-full p-1 mt-0.5">
                      <Check className="h-4 w-4 text-green-600" />
                    </div>
                    <ReputationGuardPreview>
                      <span className="text-gray-700 border-b border-dashed border-gray-400 cursor-pointer hover:text-gold hover:border-gold transition-colors inline-flex items-center gap-1.5">
                        ⭐ Smart Reputation Guard
                        <Eye className="h-3.5 w-3.5 text-gray-400" />
                      </span>
                    </ReputationGuardPreview>
                  </li>
                </ul>
              </div>

              {/* Revenue Engine Section */}
              <div className="border-t border-gray-100 pt-4 mb-4">
                <h4 className="text-xs font-bold text-slate-dark mb-3">💰 Automated Revenue Engine</h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="bg-green-100 rounded-full p-1 mt-0.5">
                      <Check className="h-4 w-4 text-green-600" />
                    </div>
                    <BirthdayGiftPreview>
                      <span className="text-gray-700 border-b border-dashed border-gray-400 cursor-pointer hover:text-gold hover:border-gold transition-colors inline-flex items-center gap-1.5">
                        🎂 Birthday Gift Emails
                        <Eye className="h-3.5 w-3.5 text-gray-400" />
                      </span>
                    </BirthdayGiftPreview>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-green-100 rounded-full p-1 mt-0.5">
                      <Check className="h-4 w-4 text-green-600" />
                    </div>
                    <FlashSalePreview>
                      <span className="text-gray-700 border-b border-dashed border-gray-400 cursor-pointer hover:text-gold hover:border-gold transition-colors inline-flex items-center gap-1.5">
                        ⚡ Flash Sale Broadcasts
                        <Eye className="h-3.5 w-3.5 text-gray-400" />
                      </span>
                    </FlashSalePreview>
                  </li>
                </ul>
              </div>

              {/* Win-Back Bot Section */}
              <div className="border-t border-gray-100 pt-4 mb-6">
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="bg-green-100 rounded-full p-1 mt-0.5">
                      <Check className="h-4 w-4 text-green-600" />
                    </div>
                    <WinBackPreview>
                      <span className="text-gray-700 border-b border-dashed border-gray-400 cursor-pointer hover:text-gold hover:border-gold transition-colors inline-flex items-center gap-1.5">
                        🧟‍♀️ The "Win-Back" Bot
                        <Eye className="h-3.5 w-3.5 text-gray-400" />
                      </span>
                    </WinBackPreview>
                  </li>
                </ul>
              </div>

              <button className="w-full bg-gradient-to-r from-gold to-yellow-400 text-white py-4 rounded-2xl font-semibold text-lg">
                Go VIP
              </button>
              <p className="text-center text-xs text-gray-500 mt-3">The complete Google Maps domination package</p>
            </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal variant="blur" className="text-center mb-16">
            <div className="inline-block bg-white rounded-full px-6 py-2 mb-6 shadow-sm">
              <span className="text-primary font-semibold">Our Process</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-dark mb-6">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              From zero to fully-booked in 5 simple steps
            </p>
          </ScrollReveal>
          
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Step 1 */}
            <ScrollReveal variant="left" delay={1}>
            <div className="bg-white rounded-2xl p-8 card-shadow flex flex-col md:flex-row gap-6 items-start">
              <div className="bg-gradient-to-br from-primary to-secondary rounded-2xl w-16 h-16 flex-shrink-0 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                01
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-dark mb-3">Share Your Vibe ✨</h3>
                <p className="text-gray-600 leading-relaxed">
                  You complete a simple 5-minute form. Upload your price list, your favorite photos, and tell us your color preference (e.g., "Pink & Gold"). We handle the rest.
                </p>
              </div>
            </div>
            </ScrollReveal>

            {/* Step 2 */}
            <ScrollReveal variant="right" delay={2}>
            <div className="bg-white rounded-2xl p-8 card-shadow flex flex-col md:flex-row gap-6 items-start">
              <div className="bg-gradient-to-br from-secondary to-purple-500 rounded-2xl w-16 h-16 flex-shrink-0 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                02
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-dark mb-3">The 48-Hour Makeover 💄</h3>
                <p className="text-gray-600 leading-relaxed">
                  Our team gets to work. Our web developer builds your high-end website and booking system, while our AI developer trains your AI Assistant to know your prices and hours perfectly.
                </p>
              </div>
            </div>
            </ScrollReveal>

            {/* Step 3 */}
            <ScrollReveal variant="left" delay={3}>
            <div className="bg-white rounded-2xl p-8 card-shadow flex flex-col md:flex-row gap-6 items-start">
              <div className="bg-gradient-to-br from-purple-500 to-primary rounded-2xl w-16 h-16 flex-shrink-0 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                03
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-dark mb-3">The Reveal 🤩</h3>
                <p className="text-gray-600 leading-relaxed">
                  Within 2 days, we send you a private link to preview your new Digital Storefront. It will look polished, professional, and ready for clients. You give us the thumbs up.
                </p>
              </div>
            </div>
            </ScrollReveal>

            {/* Step 4 */}
            <ScrollReveal variant="right" delay={4}>
            <div className="bg-white rounded-2xl p-8 card-shadow flex flex-col md:flex-row gap-6 items-start">
              <div className="bg-gradient-to-br from-primary to-secondary rounded-2xl w-16 h-16 flex-shrink-0 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                04
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-dark mb-3">Sync to Your Phone 📲</h3>
                <p className="text-gray-600 leading-relaxed">
                  We connect the system directly to your iPhone or Google Calendar. You don't need to learn new software—just keep using your phone calendar, and the website updates automatically.
                </p>
              </div>
            </div>
            </ScrollReveal>

            {/* Step 5 */}
            <ScrollReveal variant="left" delay={5}>
            <div className="bg-white rounded-2xl p-8 card-shadow flex flex-col md:flex-row gap-6 items-start">
              <div className="bg-gradient-to-br from-secondary to-purple-500 rounded-2xl w-16 h-16 flex-shrink-0 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                05
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-dark mb-3">Auto-Pilot Mode 🚀</h3>
                <p className="text-gray-600 leading-relaxed">
                  We flip the switch. Your website goes live, your Google Maps "Book" button gets activated, and you start waking up to new appointment notifications without lifting a finger.
                </p>
              </div>
            </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Enhanced Portfolio Section */}
      <section id="portfolio" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal variant="blur" className="text-center mb-20">
            <div className="inline-block bg-white rounded-full px-6 py-2 mb-6 shadow-sm">
              <span className="text-primary font-semibold">Portfolio</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-dark mb-6">Our Work</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              See how we've helped European beauty businesses grow and now bringing this expertise to UK & USA markets
            </p>
          </ScrollReveal>

          {/* Portfolio Filter */}
          <ScrollReveal variant="default" delay={1}>
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {[
              { id: 'all', label: 'All Projects' },
              { id: 'nail-salon', label: 'Nail Salons' },
              { id: 'lash-studio', label: 'Lash Studios' },
              { id: 'spa', label: 'Spas & Wellness' },
              { id: 'beauty-clinic', label: 'Beauty Clinics' }
            ].map((filter) => (
              <button
                key={filter.id}
                onClick={() => setPortfolioFilter(filter.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  portfolioFilter === filter.id
                    ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:text-primary hover:shadow-md border border-gray-200'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
          </ScrollReveal>

          {/* Portfolio Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPortfolio.map((item, index) => (
              <ScrollReveal key={index} variant="scale" delay={Math.min(index + 1, 6)}>
              <div className="group relative overflow-hidden rounded-3xl card-shadow hover:card-shadow-hover transition-all duration-500 hover:-translate-y-2 bg-white h-full">
                <div className="relative overflow-hidden">
                  <img 
                    src={item.thumbnail} 
                    alt={item.title}
                    className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                      <Play className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="bg-white/90 backdrop-blur-sm text-xs font-semibold px-3 py-1 rounded-full text-primary">
                      {item.type.replace('-', ' ').toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-slate-dark">{item.title}</h3>
                    <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      {item.client}
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-4">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="text-primary font-semibold text-sm">
                      {item.results}
                    </div>
                    <div className="text-primary font-semibold text-sm uppercase tracking-wide hover:text-secondary transition-colors cursor-pointer">
                      View Case Study →
                    </div>
                  </div>
                </div>
              </div>
              </ScrollReveal>
            ))}
          </div>
          
          <ScrollReveal variant="bounce" delay={2}>
          <div className="text-center mt-16">
            <button className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105">
              View All Projects
            </button>
          </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section id="testimonials" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal variant="blur" className="text-center mb-20">
            <div className="inline-block bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full px-6 py-2 mb-6">
              <span className="text-primary font-semibold">Client Success Stories</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-dark mb-6">What Our Clients Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">Success stories from European beauty businesses we've helped grow and expand</p>
          </ScrollReveal>
          <ScrollReveal variant="scale" delay={1}>
          <div className="relative max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-12 card-shadow text-center border border-gray-100">
              <div className="flex justify-center mb-8">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 text-gold fill-current" />
                ))}
              </div>
              <blockquote className="text-2xl md:text-3xl text-slate-dark mb-8 leading-relaxed font-medium">
                "{testimonials[currentTestimonial].quote}"
              </blockquote>
              <div className="flex items-center justify-center space-x-6 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">{testimonials[currentTestimonial].name.charAt(0)}</span>
                </div>
                <div className="text-left">
                  <div className="font-bold text-slate-dark text-lg">{testimonials[currentTestimonial].name}</div>
                  <div className="text-gray-600">{testimonials[currentTestimonial].business}</div>
                </div>
              </div>
              <div className="inline-block bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full px-6 py-2">
                <span className="text-primary font-semibold text-sm">Result: {testimonials[currentTestimonial].result}</span>
              </div>
            </div>
            <button 
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-6 bg-white rounded-full p-3 card-shadow hover:card-shadow-hover transition-all duration-300 hover:scale-110"
            >
              <ChevronLeft className="h-6 w-6 text-primary" />
            </button>
            <button 
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-6 bg-white rounded-full p-3 card-shadow hover:card-shadow-hover transition-all duration-300 hover:scale-110"
            >
              <ChevronRight className="h-6 w-6 text-primary" />
            </button>
          </div>
          <div className="flex justify-center mt-12 space-x-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  index === currentTestimonial ? 'bg-primary scale-125' : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 lg:py-32 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
        {/* Animated gradient mesh */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-primary/40 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-secondary/40 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/20 via-transparent to-transparent"></div>
        </div>
        
        {/* Animated orbs */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-primary/30 rounded-full blur-[100px] animate-pulse-soft"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] animate-pulse-soft" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[150px] animate-pulse-soft" style={{ animationDelay: '2s' }}></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 grid-pattern opacity-10"></div>
        
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="absolute w-2 h-2 bg-white/20 rounded-full animate-float" style={{ 
              left: `${15 + i * 15}%`, 
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${4 + i}s`
            }}></div>
          ))}
        </div>
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <ScrollReveal variant="hero">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 mb-8 border border-white/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
            </span>
            <span className="text-white/90 font-semibold">Ready to get started?</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-8 leading-[1.1] tracking-tight">
            Ready to Grow Your <br />
            <span className="bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 bg-clip-text text-transparent">Beauty Business?</span>
          </h2>
          
          <p className="text-lg md:text-xl lg:text-2xl mb-12 text-white/80 max-w-3xl mx-auto leading-relaxed">
            Join the growing community of beauty professionals expanding from Europe to UK & USA markets
          </p>
          </ScrollReveal>
          
          <ScrollReveal variant="scale" delay={2}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link href="/create-landing-page" className="group relative bg-white text-slate-dark px-10 py-5 rounded-2xl text-lg font-bold transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 overflow-hidden shadow-2xl shadow-white/20">
              <span className="relative z-10 flex items-center gap-2">
                Upload Your Content Now
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            <button className="group border-2 border-white/30 text-white px-10 py-5 rounded-2xl text-lg font-semibold hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-sm flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              Schedule a Call
            </button>
          </div>
          </ScrollReveal>
          
          <ScrollReveal variant="default" delay={3}>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <div className="w-5 h-5 bg-green-400/20 rounded-full flex items-center justify-center">
                <Check className="h-3 w-3 text-green-400" />
              </div>
              <span className="text-white/90 text-sm font-medium">No contracts</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <div className="w-5 h-5 bg-green-400/20 rounded-full flex items-center justify-center">
                <Check className="h-3 w-3 text-green-400" />
              </div>
              <span className="text-white/90 text-sm font-medium">Cancel anytime</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <div className="w-5 h-5 bg-green-400/20 rounded-full flex items-center justify-center">
                <Check className="h-3 w-3 text-green-400" />
              </div>
              <span className="text-white/90 text-sm font-medium">Results guaranteed</span>
            </div>
          </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Enhanced Footer with Social Media */}
      <footer className="bg-slate-dark text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <ScrollReveal variant="default" delay={1} className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-gradient-to-br from-primary to-secondary p-2 rounded-xl">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold">GlowBoost Studio</span>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed mb-6 max-w-md">
                Helping beauty businesses shine online with professional marketing solutions that drive real results and build lasting success.
              </p>
              <div className="flex space-x-4 mb-8">
                <a href="#" className="bg-gray-700 hover:bg-gradient-to-r hover:from-primary hover:to-secondary p-3 rounded-xl transition-all duration-300 group">
                  <Instagram className="w-5 h-5 text-gray-300 group-hover:text-white" />
                </a>
                <a href="#" className="bg-gray-700 hover:bg-gradient-to-r hover:from-primary hover:to-secondary p-3 rounded-xl transition-all duration-300 group">
                  <Facebook className="w-5 h-5 text-gray-300 group-hover:text-white" />
                </a>
                <a href="#" className="bg-gray-700 hover:bg-gradient-to-r hover:from-primary hover:to-secondary p-3 rounded-xl transition-all duration-300 group">
                  <Linkedin className="w-5 h-5 text-gray-300 group-hover:text-white" />
                </a>
                <a href="#" className="bg-gray-700 hover:bg-gradient-to-r hover:from-primary hover:to-secondary p-3 rounded-xl transition-all duration-300 group">
                  <MessageCircle className="w-5 h-5 text-gray-300 group-hover:text-white" />
                </a>
              </div>
              <div className="text-gray-400 text-sm">
                <p className="mb-2">📧 hello@glowbooststudio.com</p>
                <p className="mb-2">📱 +1 (555) 123-4567</p>
                <p>🌟 Follow us for beauty marketing tips & inspiration</p>
              </div>
            </ScrollReveal>
            <ScrollReveal variant="default" delay={2}>
              <h3 className="font-bold text-lg mb-6 text-white">Services</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="hover:text-primary transition-colors cursor-pointer flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Brand Strategy
                </li>
                <li className="hover:text-primary transition-colors cursor-pointer flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Landing Pages
                </li>
                <li className="hover:text-primary transition-colors cursor-pointer flex items-center gap-2">
                  <Video className="h-4 w-4" />
                  Video Creation
                </li>
                <li className="hover:text-primary transition-colors cursor-pointer flex items-center gap-2">
                  <Instagram className="h-4 w-4" />
                  Social Media Ads
                </li>
                <li className="hover:text-primary transition-colors cursor-pointer flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Analytics & Tracking
                </li>
              </ul>
            </ScrollReveal>
            <ScrollReveal variant="default" delay={3}>
              <h3 className="font-bold text-lg mb-6 text-white">Resources</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="hover:text-primary transition-colors cursor-pointer">Portfolio</li>
                <li className="hover:text-primary transition-colors cursor-pointer">Case Studies</li>
                <li className="hover:text-primary transition-colors cursor-pointer">Beauty Marketing Blog</li>
                <li className="hover:text-primary transition-colors cursor-pointer">Free Strategy Call</li>
                <li className="hover:text-primary transition-colors cursor-pointer">Help Center</li>
                <li className="hover:text-primary transition-colors cursor-pointer">Live Chat Support</li>
              </ul>
            </ScrollReveal>
          </div>
          
          {/* Social Proof Bar */}
          <div className="border-t border-gray-700 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
              <div className="text-center md:text-left mb-6 md:mb-0">
                <h4 className="text-white font-semibold mb-2">Expand Your Beauty Business to UK & USA Markets</h4>
                <p className="text-gray-400 text-sm">Get weekly marketing tips, industry insights, and exclusive launch offers</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="px-4 py-3 rounded-xl bg-gray-800 text-white placeholder-gray-400 border border-gray-600 focus:border-primary focus:outline-none"
                />
                <button className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">&copy; 2024 GlowBoost Studio. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0 text-sm text-gray-400">
              <span className="hover:text-primary transition-colors cursor-pointer">Privacy Policy</span>
              <span className="hover:text-primary transition-colors cursor-pointer">Terms of Service</span>
              <span className="hover:text-primary transition-colors cursor-pointer">Cookie Policy</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}