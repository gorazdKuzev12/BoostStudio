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

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-slate-light via-white to-blue-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full px-6 py-3 mb-8">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-sm font-medium text-slate-dark">Loved in Europe • Now expanding to UK & USA</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-slate-dark mb-6 leading-tight">
              Get More Clients with <br />
              <span className="gradient-text">Stunning Videos & Ads</span>
              <br />
              <span className="text-3xl md:text-4xl font-normal text-gray-600">Done for You ✨</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
              European-proven strategies now available in UK & USA. We help nail salons, lash artists, and beauty businesses 
              attract dream clients with professional landing pages, captivating videos, and high-converting social media campaigns.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <Link href="/create-landing-page" className="bg-gradient-to-r from-primary to-secondary text-white px-10 py-5 rounded-2xl text-lg font-semibold hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
                Get Started Now
              </Link>
              <button className="border-2 border-gray-300 text-slate-dark px-10 py-5 rounded-2xl text-lg font-semibold hover:bg-gray-50 hover:border-primary transition-all duration-300 flex items-center gap-3">
                <Play className="h-6 w-6" />
                View Examples
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-dark mb-2">15+</div>
                <div className="text-gray-600">Beauty Brands Transformed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-dark mb-2">100K+</div>
                <div className="text-gray-600">Views Generated</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-dark mb-2">150%</div>
                <div className="text-gray-600">Average Booking Increase</div>
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
              <span className="text-primary font-semibold">Our Expertise</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-dark mb-6">Comprehensive Beauty Marketing</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Bringing 3+ years of European beauty marketing expertise to UK & USA. End-to-end solutions that drive real growth.
            </p>
          </div>

          {/* Service Categories */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
            {/* Brand Strategy & Development */}
            <div className="group">
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-10 card-shadow group-hover:card-shadow-hover transition-all duration-500 border border-gray-100">
                <div className="flex items-center mb-8">
                  <div className="bg-gradient-to-br from-primary/10 to-primary/5 w-16 h-16 rounded-2xl flex items-center justify-center mr-6">
                    <Target className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-dark mb-2">Brand Strategy</h3>
                    <p className="text-gray-600">Foundation | Identity | Positioning</p>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed mb-6">
                  We start by defining your brand values, unique selling proposition, and market positioning. 
                  Then we craft a compelling brand identity that resonates with your target audience and drives authentic engagement.
                </p>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-primary" />
                    <span>Brand workshops & strategy sessions</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-primary" />
                    <span>Market analysis & competitor research</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-primary" />
                    <span>Brand messaging & tone of voice</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Digital Presence */}
            <div className="group">
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-10 card-shadow group-hover:card-shadow-hover transition-all duration-500 border border-gray-100">
                <div className="flex items-center mb-8">
                  <div className="bg-gradient-to-br from-secondary/10 to-secondary/5 w-16 h-16 rounded-2xl flex items-center justify-center mr-6">
                    <Globe className="h-8 w-8 text-secondary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-dark mb-2">Digital Presence</h3>
                    <p className="text-gray-600">Websites | Landing Pages | Booking Systems</p>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Professional, conversion-optimized websites and landing pages that turn visitors into loyal clients. 
                  Mobile-first design with integrated booking systems for seamless customer experience.
                </p>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-secondary" />
                    <span>Custom landing page design</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-secondary" />
                    <span>Mobile-optimized user experience</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-secondary" />
                    <span>Integrated booking & payment systems</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Content Creation */}
            <div className="group">
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-10 card-shadow group-hover:card-shadow-hover transition-all duration-500 border border-gray-100">
                <div className="flex items-center mb-8">
                  <div className="bg-gradient-to-br from-primary/10 to-primary/5 w-16 h-16 rounded-2xl flex items-center justify-center mr-6">
                    <Camera className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-dark mb-2">Content Creation</h3>
                    <p className="text-gray-600">Videos | Photography | Storytelling</p>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Stunning visual content that showcases your work and tells your brand story. 
                  From promotional videos to behind-the-scenes content that builds trust and drives engagement.
                </p>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-primary" />
                    <span>Professional video production</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-primary" />
                    <span>Behind-the-scenes content</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-primary" />
                    <span>Educational & promotional videos</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Social Media Marketing */}
            <div className="group">
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-10 card-shadow group-hover:card-shadow-hover transition-all duration-500 border border-gray-100">
                <div className="flex items-center mb-8">
                  <div className="bg-gradient-to-br from-secondary/10 to-secondary/5 w-16 h-16 rounded-2xl flex items-center justify-center mr-6">
                    <Instagram className="h-8 w-8 text-secondary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-dark mb-2">Social Media Marketing</h3>
                    <p className="text-gray-600">Strategy | Content | Advertising | Growth</p>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Strategic social media management that builds authentic communities and drives real business results. 
                  From content planning to paid advertising campaigns that convert followers into customers.
                </p>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-secondary" />
                    <span>Instagram & Facebook ad campaigns</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-secondary" />
                    <span>Content strategy & scheduling</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-secondary" />
                    <span>Community management & engagement</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-16 border-t border-gray-100">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">3+</div>
              <div className="text-gray-600">Years in Europe</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary mb-2">15+</div>
              <div className="text-gray-600">Beauty Brands</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">50K+</div>
              <div className="text-gray-600">Content Views</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary mb-2">100%</div>
              <div className="text-gray-600">Client Satisfaction</div>
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
              Choose the perfect plan to grow your beauty business with our proven marketing strategies
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Basic Plan */}
            <div className="bg-white rounded-3xl p-8 card-shadow hover:card-shadow-hover transition-all duration-500 hover:-translate-y-2 border border-gray-100">
              <div className="text-center mb-8">
                <div className="bg-gray-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-slate-dark">S</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-dark mb-2">Basic</h3>
                <div className="text-5xl font-bold text-slate-dark mb-2">€30<span className="text-lg text-gray-500 font-normal">/month</span></div>
                <p className="text-gray-600">Perfect for getting started</p>
              </div>
              <ul className="space-y-4 mb-10">
                <li className="flex items-center gap-3">
                  <div className="bg-green-100 rounded-full p-1">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">Professional landing page</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="bg-green-100 rounded-full p-1">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">1 promotional video</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="bg-green-100 rounded-full p-1">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">Basic analytics</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="bg-green-100 rounded-full p-1">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">Email support</span>
                </li>
              </ul>
              <button className="w-full bg-gray-800 text-white py-4 rounded-2xl font-semibold hover:bg-gray-900 transition-colors text-lg">
                Choose Basic
              </button>
            </div>

            {/* Pro Plan */}
            <div className="bg-white rounded-3xl p-8 card-shadow hover:card-shadow-hover transition-all duration-500 hover:-translate-y-2 border-2 border-primary relative scale-105">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">Most Popular</span>
              </div>
              <div className="text-center mb-8">
                <div className="bg-gradient-to-br from-primary to-secondary w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">P</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-dark mb-2">Pro</h3>
                <div className="text-5xl font-bold text-slate-dark mb-2">€80<span className="text-lg text-gray-500 font-normal">/month</span></div>
                <p className="text-gray-600">Everything + ads management</p>
              </div>
              <ul className="space-y-4 mb-10">
                <li className="flex items-center gap-3">
                  <div className="bg-green-100 rounded-full p-1">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">Everything in Basic</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="bg-green-100 rounded-full p-1">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">Instagram ads management</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="bg-green-100 rounded-full p-1">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">€45 ad spend included</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="bg-green-100 rounded-full p-1">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">Weekly performance reports</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="bg-green-100 rounded-full p-1">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">Priority support</span>
                </li>
              </ul>
              <button className="w-full bg-gradient-to-r from-primary to-secondary text-white py-4 rounded-2xl font-semibold hover:shadow-xl transition-all text-lg">
                Choose Pro
              </button>
            </div>

            {/* VIP Plan */}
            <div className="bg-white rounded-3xl p-8 card-shadow hover:card-shadow-hover transition-all duration-500 hover:-translate-y-2 border border-gray-100">
              <div className="text-center mb-8">
                <div className="bg-gradient-to-br from-gold to-yellow-400 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">V</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-dark mb-2">VIP</h3>
                <div className="text-5xl font-bold text-slate-dark mb-2">€120<span className="text-lg text-gray-500 font-normal">/month</span></div>
                <p className="text-gray-600">Full-service growth package</p>
              </div>
              <ul className="space-y-4 mb-10">
                <li className="flex items-center gap-3">
                  <div className="bg-green-100 rounded-full p-1">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">Everything in Pro</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="bg-green-100 rounded-full p-1">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">Monthly video updates</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="bg-green-100 rounded-full p-1">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">Custom ad strategy</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="bg-green-100 rounded-full p-1">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">A/B testing</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="bg-green-100 rounded-full p-1">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">Dedicated account manager</span>
                </li>
              </ul>
              <button className="w-full bg-gold text-white py-4 rounded-2xl font-semibold hover:bg-yellow-500 transition-colors text-lg">
                Choose VIP
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-block bg-white rounded-full px-6 py-2 mb-6 shadow-sm">
              <span className="text-primary font-semibold">Our Process</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-dark mb-6">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              From content to bookings in 5 simple steps that guarantee results
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {[
              { step: "01", title: "Upload Content", desc: "Send us photos/videos of your work", color: "from-primary to-secondary" },
              { step: "02", title: "We Create", desc: "Our team crafts your landing page & videos", color: "from-secondary to-purple-500" },
              { step: "03", title: "Launch Ads", desc: "We set up & run targeted Instagram campaigns", color: "from-purple-500 to-primary" },
              { step: "04", title: "Get Leads", desc: "Qualified clients discover your business", color: "from-primary to-secondary" },
              { step: "05", title: "Book More", desc: "Watch your appointment book fill up", color: "from-secondary to-purple-500" }
            ].map((item, index) => (
              <div key={index} className="text-center relative group">
                <div className={`bg-gradient-to-br ${item.color} rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6 text-white font-bold text-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-slate-dark mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                {index < 4 && (
                  <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-gray-200 to-gray-300 transform -translate-y-1/2"></div>
                )}
              </div>
            ))}
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