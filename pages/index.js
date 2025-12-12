import { useState } from 'react'
import { ChevronLeft, ChevronRight, Star, Play, Check, Sparkles, Video, Globe, BarChart3, Monitor, Instagram, Facebook, Linkedin, MessageCircle, Users, TrendingUp, Camera, Palette, Target } from 'lucide-react'
import Link from 'next/link'

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
    <div className="min-h-screen bg-slate-light font-poppins">
      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-xl fixed w-full top-0 z-50 border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-primary to-secondary p-2 rounded-xl">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-slate-dark">GlowBoost<span className="gradient-text">Studio</span></span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#services" className="text-slate-dark hover:text-primary transition-colors font-medium">Services</a>
              <a href="#pricing" className="text-slate-dark hover:text-primary transition-colors font-medium">Pricing</a>
              <a href="#portfolio" className="text-slate-dark hover:text-primary transition-colors font-medium">Portfolio</a>
              <a href="#testimonials" className="text-slate-dark hover:text-primary transition-colors font-medium">Reviews</a>
              <Link href="/login" className="text-slate-dark hover:text-primary transition-colors font-medium">Login</Link>
            </div>
            <Link href="/create-landing-page" className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-3 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 font-semibold">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section - Premium Split Screen */}
      <section className="pt-24 lg:pt-32 pb-16 lg:pb-24 min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-white">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-primary/5 to-transparent"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-secondary/10 to-purple-200/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-pink-100/50 to-transparent rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left Side - Content */}
            <div className="order-2 lg:order-1 animate-fade-in-up">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-purple-200 rounded-full px-5 py-2.5 mb-8 shadow-sm">
                <span className="text-lg">✨</span>
                <span className="text-sm font-medium text-slate-dark">Loved in Europe • Now in USA</span>
              </div>
              
              {/* Headline */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-dark mb-6 leading-tight">
                European Design.
                <br />
                <span className="bg-gradient-to-r from-primary via-purple-500 to-secondary bg-clip-text text-transparent">
                  Silicon Valley Intelligence.
                </span>
              </h1>
              
              {/* Subhead */}
              <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed max-w-xl">
                Stop losing clients to voicemail. We build stunning, mobile-first websites equipped with an 
                <span className="font-semibold text-slate-dark"> AI Receptionist</span> that works while you sleep.
              </p>
              
              {/* Features */}
              <div className="space-y-4 mb-10">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl flex items-center justify-center">
                    <span className="text-xl">✨</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-dark mb-1">Stunning Visuals that Convert</h3>
                    <p className="text-gray-600 text-sm">Pixel-perfect design tailored to the US market.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center">
                    <span className="text-xl">📅</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-dark mb-1">Fully Integrated Booking Calendar</h3>
                    <p className="text-gray-600 text-sm">Syncs with your iPhone/Google Calendar. Clients book 24/7, you never get double-booked.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-secondary/10 to-purple-100 rounded-xl flex items-center justify-center">
                    <span className="text-xl">🧠</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-dark mb-1">The Receptionist That Never Sleeps</h3>
                    <p className="text-gray-600 text-sm">An embedded AI agent that answers questions and fills your calendar 24/7.</p>
                  </div>
                </div>
              </div>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/create-landing-page" className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:shadow-2xl hover:shadow-primary/25 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 text-center">
                  Get Started Now
                </Link>
                <button className="group border-2 border-gray-200 bg-white/80 backdrop-blur-sm text-slate-dark px-8 py-4 rounded-2xl text-lg font-semibold hover:border-primary hover:bg-white transition-all duration-300 flex items-center justify-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="h-4 w-4 text-white ml-0.5" />
                  </div>
                  Watch Demo
                </button>
              </div>
            </div>
            
            {/* Right Side - Laptop Mockup with Video */}
            <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-lg lg:max-w-xl">
                {/* Laptop Frame */}
                <div className="relative">
                  {/* Screen Bezel */}
                  <div className="bg-gray-800 rounded-t-2xl p-3 pb-0">
                    {/* Browser Chrome */}
                    <div className="bg-gray-700 rounded-t-lg px-4 py-2 flex items-center gap-2">
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      </div>
                      <div className="flex-1 mx-4">
                        <div className="bg-gray-600 rounded-md px-3 py-1 text-xs text-gray-300 truncate">
                          glowbooststudio.com
                        </div>
                      </div>
                    </div>
                    
                    {/* Video Container */}
                    <div className="bg-white rounded-b-lg overflow-hidden aspect-video">
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
                    </div>
                  </div>
                  
                  {/* Laptop Base */}
                  <div className="bg-gray-800 h-4 rounded-b-lg"></div>
                  <div className="bg-gray-700 h-2 mx-16 rounded-b-xl"></div>
                  
                  {/* Shadow */}
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-black/20 blur-xl rounded-full"></div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl p-4 animate-bounce-slow">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <Check className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">New Booking</p>
                      <p className="text-sm font-semibold text-slate-dark">Sarah M.</p>
                    </div>
                  </div>
                </div>
                
                <div className="absolute -bottom-2 -left-4 bg-white rounded-2xl shadow-xl p-4 animate-bounce-slow" style={{ animationDelay: '1s' }}>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <MessageCircle className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">AI Replied</p>
                      <p className="text-sm font-semibold text-slate-dark">"Price sent!"</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* Enhanced Services Section */}
      <section id="services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-block bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full px-6 py-2 mb-6">
              <span className="text-primary font-semibold">What We Build For You</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-dark mb-6">Beauty Tech That Works While You Sleep</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Automation, aesthetics, and results—everything a modern salon owner needs to scale.
            </p>
          </div>

          {/* Service Categories */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
            {/* Digital Storefront Design */}
            <div className="group">
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-10 card-shadow group-hover:card-shadow-hover transition-all duration-500 border border-gray-100">
                <div className="flex items-center mb-8">
                  <div className="bg-gradient-to-br from-primary/10 to-primary/5 w-16 h-16 rounded-2xl flex items-center justify-center mr-6">
                    <Palette className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-dark mb-2">Digital Storefront Design</h3>
                    <p className="text-gray-600">Aesthetic | Branding | Mobile-First</p>
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

            {/* 24/7 Booking Automation */}
            <div className="group">
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-10 card-shadow group-hover:card-shadow-hover transition-all duration-500 border border-gray-100">
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

            {/* The AI Receptionist */}
            <div className="group">
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-10 card-shadow group-hover:card-shadow-hover transition-all duration-500 border border-gray-100">
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

            {/* Viral Content & Growth */}
            <div className="group">
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-10 card-shadow group-hover:card-shadow-hover transition-all duration-500 border border-gray-100">
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
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-16 border-t border-gray-100">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">48h</div>
              <div className="text-gray-600">Average Setup Time</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary mb-2">15+</div>
              <div className="text-gray-600">Salons Automated</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <div className="text-gray-600">AI Availability</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary mb-2">0</div>
              <div className="text-gray-600">Phone Tag Required</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-block bg-white rounded-full px-6 py-2 mb-6 shadow-sm">
              <span className="text-primary font-semibold">Pricing Plans</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-dark mb-6">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Choose the perfect plan to grow your beauty business
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Essential Plan */}
            <div className="bg-white rounded-3xl p-8 card-shadow hover:card-shadow-hover transition-all duration-500 hover:-translate-y-2 border border-gray-100">
              <div className="text-center mb-8">
                <div className="bg-gray-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Monitor className="h-8 w-8 text-slate-dark" />
                </div>
                <h3 className="text-2xl font-bold text-slate-dark mb-2">The Essential</h3>
                <p className="text-sm text-gray-500 mb-4">Best for new solo artists</p>
                <div className="text-5xl font-bold text-slate-dark mb-2">$49<span className="text-lg text-gray-500 font-normal">/month</span></div>
                <p className="text-sm text-gray-500">+ $299 one-time setup fee</p>
              </div>
              <ul className="space-y-4 mb-10">
                <li className="flex items-start gap-3">
                  <div className="bg-green-100 rounded-full p-1 mt-0.5">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">💻 High-End Landing Page</span>
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
                  <span className="text-gray-700">🔒 Hosting & Security included</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-green-100 rounded-full p-1 mt-0.5">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">🎨 Custom Logo Design</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-green-100 rounded-full p-1 mt-0.5">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">📇 Business Card Design (QR code)</span>
                </li>
              </ul>
              <button className="w-full bg-gray-800 text-white py-4 rounded-2xl font-semibold hover:bg-gray-900 transition-colors text-lg">
                Get Started
              </button>
            </div>

            {/* Auto-Booker Plan */}
            <div className="bg-white rounded-3xl p-8 card-shadow hover:card-shadow-hover transition-all duration-500 hover:-translate-y-2 border-2 border-primary relative scale-105">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">RECOMMENDED</span>
              </div>
              <div className="text-center mb-8">
                <div className="bg-gradient-to-br from-primary to-secondary w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <BarChart3 className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-dark mb-2">The Auto-Booker</h3>
                <p className="text-sm text-gray-500 mb-4">Stop playing "Phone Tag"</p>
                <div className="text-5xl font-bold text-slate-dark mb-2">$99<span className="text-lg text-gray-500 font-normal">/month</span></div>
                <p className="text-sm text-green-600 font-semibold">🎉 <span className="line-through text-gray-400">$299</span> Setup Fee WAIVED</p>
              </div>
              <ul className="space-y-4 mb-10">
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
              </ul>
              <button className="w-full bg-gradient-to-r from-primary to-secondary text-white py-4 rounded-2xl font-semibold hover:shadow-xl transition-all text-lg">
                Start This Week
              </button>
              <p className="text-center text-xs text-gray-500 mt-3">Limited time: No setup fee!</p>
            </div>

            {/* Viral VIP Plan */}
            <div className="bg-white rounded-3xl p-8 card-shadow hover:card-shadow-hover transition-all duration-500 hover:-translate-y-2 border border-gray-100">
              <div className="text-center mb-8">
                <div className="bg-gradient-to-br from-gold to-yellow-400 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Star className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-dark mb-2">The Viral VIP</h3>
                <p className="text-sm text-gray-500 mb-4">Dominate Instagram & Google</p>
                <div className="text-5xl font-bold text-slate-dark mb-2">$249<span className="text-lg text-gray-500 font-normal">/month</span></div>
                <p className="text-sm text-gray-500">+ $499 one-time setup fee</p>
              </div>
              <ul className="space-y-4 mb-10">
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
                  <span className="text-gray-700">🎥 4 Pro Reels/TikToks per month</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-green-100 rounded-full p-1 mt-0.5">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">🚀 Google SEO Boost</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-green-100 rounded-full p-1 mt-0.5">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">👑 Priority WhatsApp Support</span>
                </li>
              </ul>
              <button className="w-full bg-gold text-white py-4 rounded-2xl font-semibold hover:bg-yellow-500 transition-colors text-lg">
                Go VIP
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block bg-white rounded-full px-6 py-2 mb-6 shadow-sm">
              <span className="text-primary font-semibold">Our Process</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-dark mb-6">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              From zero to fully-booked in 5 simple steps
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Step 1 */}
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

            {/* Step 2 */}
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

            {/* Step 3 */}
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

            {/* Step 4 */}
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

            {/* Step 5 */}
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
          </div>
        </div>
      </section>

      {/* Enhanced Portfolio Section */}
      <section id="portfolio" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-block bg-white rounded-full px-6 py-2 mb-6 shadow-sm">
              <span className="text-primary font-semibold">Portfolio</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-dark mb-6">Our Work</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              See how we've helped European beauty businesses grow and now bringing this expertise to UK & USA markets
            </p>
          </div>

          {/* Portfolio Filter */}
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

          {/* Portfolio Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPortfolio.map((item, index) => (
              <div key={index} className="group relative overflow-hidden rounded-3xl card-shadow hover:card-shadow-hover transition-all duration-500 hover:-translate-y-2 bg-white">
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
            ))}
          </div>
          
          <div className="text-center mt-16">
            <button className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105">
              View All Projects
            </button>
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section id="testimonials" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-block bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full px-6 py-2 mb-6">
              <span className="text-primary font-semibold">Client Success Stories</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-dark mb-6">What Our Clients Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">Success stories from European beauty businesses we've helped grow and expand</p>
          </div>
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
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary via-secondary to-purple-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 inline-block mb-8">
            <span className="text-white/90 font-semibold">Ready to get started?</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
            Ready to Grow Your <br />
            Beauty Business?
          </h2>
          
          <p className="text-xl md:text-2xl mb-12 opacity-90 max-w-3xl mx-auto leading-relaxed">
            Join the growing community of beauty professionals expanding from Europe to UK & USA markets
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <Link href="/create-landing-page" className="bg-white text-primary px-10 py-5 rounded-2xl text-lg font-bold hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
              Upload Your Content Now
            </Link>
            <button className="border-2 border-white/30 text-white px-10 py-5 rounded-2xl text-lg font-semibold hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
              Schedule a Call
            </button>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-white/80 text-sm">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4" />
              <span>No contracts</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4" />
              <span>Cancel anytime</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4" />
              <span>Results guaranteed</span>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer with Social Media */}
      <footer className="bg-slate-dark text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="md:col-span-2">
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
            </div>
            <div>
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
            </div>
            <div>
              <h3 className="font-bold text-lg mb-6 text-white">Resources</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="hover:text-primary transition-colors cursor-pointer">Portfolio</li>
                <li className="hover:text-primary transition-colors cursor-pointer">Case Studies</li>
                <li className="hover:text-primary transition-colors cursor-pointer">Beauty Marketing Blog</li>
                <li className="hover:text-primary transition-colors cursor-pointer">Free Strategy Call</li>
                <li className="hover:text-primary transition-colors cursor-pointer">Help Center</li>
                <li className="hover:text-primary transition-colors cursor-pointer">Live Chat Support</li>
              </ul>
            </div>
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