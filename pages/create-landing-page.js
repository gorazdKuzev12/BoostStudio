import { useState } from 'react'
import { ArrowLeft, Upload, Camera, Globe, BarChart3, Sparkles, Monitor, Users, Check } from 'lucide-react'
import Link from 'next/link'

export default function CreateLandingPage() {
  const [formData, setFormData] = useState({
    businessName: '',
    phoneNumber: '',
    email: '',
    businessAddress: '',
    shortDescription: '',
    mainServices: '',
    priceList: '',
    workingHours: '',
    instagramHandle: '',
    preferredColorStyle: '',
    bookingLink: '',
    logoUpload: null,
    photosUpload: [],
    teamMembers: '',
    socialLinks: '',
    clientTestimonials: '',
    targetAudience: '',
    uniqueSellingPoints: '',
    competitorWebsites: '',
    brandPersonality: '',
    callToAction: '',
    specialOffers: '',
    businessStory: '',
    achievements: '',
    businessGoals: '',
    contentPreferences: '',
    technicalRequirements: ''
  })

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target
    if (type === 'file') {
      if (name === 'photosUpload') {
        setFormData(prev => ({ ...prev, [name]: [...prev[name], ...Array.from(files)] }))
      } else {
        setFormData(prev => ({ ...prev, [name]: files[0] }))
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    alert('Thank you! Our web development team will contact you within 24 hours to start creating your custom website.')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-light via-white to-blue-50 font-poppins">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-xl border-b border-gray-100 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-6">
              <Link href="/" className="flex items-center gap-3 text-gray-600 hover:text-primary transition-colors">
                <ArrowLeft className="h-5 w-5" />
                <span className="font-medium">Back to Home</span>
              </Link>
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-br from-primary to-secondary p-2 rounded-xl">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-slate-dark">GlowBoost<span className="gradient-text">Studio</span></span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Step 1 of 2</div>
              <div className="text-lg font-semibold text-slate-dark">Tell Us About Your Business</div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute top-0 right-20 w-64 h-64 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-20 w-80 h-80 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-full blur-3xl"></div>
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full px-6 py-3 mb-8">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-sm font-medium text-slate-dark">Ready to build your dream website</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-slate-dark mb-6 leading-tight">
            Create Your Custom <br />
            <span className="gradient-text">Beauty Website</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Our expert web developers will craft a stunning, conversion-optimized website tailored specifically to your beauty business
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
              <div className="text-2xl font-bold text-primary mb-2">24 Hours</div>
              <div className="text-gray-600">Initial Response</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
              <div className="text-2xl font-bold text-primary mb-2">7-14 Days</div>
              <div className="text-gray-600">Website Delivery</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
              <div className="text-2xl font-bold text-primary mb-2">100%</div>
              <div className="text-gray-600">Satisfaction Guaranteed</div>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
            {/* Developer Message */}
            <div className="bg-gradient-to-br from-primary/5 to-secondary/5 p-8 border-b border-gray-100">
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-primary to-secondary p-3 rounded-xl">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-dark mb-2">Our Web Development Process</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Our team of expert developers and designers will analyze every detail you provide to create a website that perfectly represents your brand and converts visitors into clients. The more information you share, the better we can tailor your site to attract your ideal customers and showcase what makes your business unique in the beauty industry.
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-10">
              {/* Essential Business Information */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-gradient-to-br from-primary to-secondary p-2 rounded-xl">
                    <Globe className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-dark">Essential Business Information</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-slate-dark font-semibold mb-2">Business Name *</label>
                    <input
                      type="text"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleInputChange}
                      className="w-full p-4 border border-gray-300 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      placeholder="e.g., Glamour Nails Studio"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-slate-dark font-semibold mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      className="w-full p-4 border border-gray-300 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      placeholder="+1 (555) 123-4567"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-slate-dark font-semibold mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full p-4 border border-gray-300 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      placeholder="contact@yourbusiness.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-slate-dark font-semibold mb-2">Business Address/Location *</label>
                    <input
                      type="text"
                      name="businessAddress"
                      value={formData.businessAddress}
                      onChange={handleInputChange}
                      className="w-full p-4 border border-gray-300 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      placeholder="123 Beauty Street, City, State"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-dark font-semibold mb-2">Short Business Description *</label>
                  <textarea
                    name="shortDescription"
                    value={formData.shortDescription}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full p-4 border border-gray-300 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                    placeholder="Describe your beauty business in 2-3 sentences. What makes you special?"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-dark font-semibold mb-2">Main Services *</label>
                  <input
                    type="text"
                    name="mainServices"
                    value={formData.mainServices}
                    onChange={handleInputChange}
                    className="w-full p-4 border border-gray-300 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    placeholder="e.g., Gel Nails, Lash Extensions, Eyebrow Threading, Facial Treatments"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-slate-dark font-semibold mb-2">Working Hours *</label>
                    <textarea
                      name="workingHours"
                      value={formData.workingHours}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full p-4 border border-gray-300 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                      placeholder="Mon-Fri: 9AM-7PM, Sat: 9AM-5PM, Sun: Closed"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-slate-dark font-semibold mb-2">Instagram Handle</label>
                    <input
                      type="text"
                      name="instagramHandle"
                      value={formData.instagramHandle}
                      onChange={handleInputChange}
                      className="w-full p-4 border border-gray-300 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      placeholder="@yourbusinessname"
                    />
                  </div>
                </div>
              </div>

              {/* Pricing & Business Details */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-gradient-to-br from-secondary to-purple-500 p-2 rounded-xl">
                    <BarChart3 className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-dark">Pricing & Business Details</h3>
                </div>

                <div>
                  <label className="block text-slate-dark font-semibold mb-2">Price List *</label>
                  <textarea
                    name="priceList"
                    value={formData.priceList}
                    onChange={handleInputChange}
                    rows="5"
                    className="w-full p-4 border border-gray-300 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                    placeholder="List your services and prices, e.g.:
Gel Manicure - $35
Classic Lash Set - $120
Lash Fill - $65
Eyebrow Shaping - $25"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-dark font-semibold mb-2">Target Audience</label>
                  <textarea
                    name="targetAudience"
                    value={formData.targetAudience}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full p-4 border border-gray-300 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                    placeholder="Who are your ideal clients? (e.g., working professionals, brides-to-be, beauty enthusiasts, age groups, etc.)"
                  />
                </div>

                <div>
                  <label className="block text-slate-dark font-semibold mb-2">Unique Selling Points</label>
                  <textarea
                    name="uniqueSellingPoints"
                    value={formData.uniqueSellingPoints}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full p-4 border border-gray-300 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                    placeholder="What makes you different from competitors? (e.g., premium products, years of experience, specialized techniques, etc.)"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-slate-dark font-semibold mb-2">Booking Link</label>
                    <input
                      type="url"
                      name="bookingLink"
                      value={formData.bookingLink}
                      onChange={handleInputChange}
                      className="w-full p-4 border border-gray-300 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      placeholder="https://booking.yourbusiness.com"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-dark font-semibold mb-2">Preferred Website Color Style</label>
                    <select
                      name="preferredColorStyle"
                      value={formData.preferredColorStyle}
                      onChange={handleInputChange}
                      className="w-full p-4 border border-gray-300 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    >
                      <option value="">Select a style</option>
                      <option value="pink-gold">Pink & Gold (Elegant)</option>
                      <option value="black-gold">Black & Gold (Luxurious)</option>
                      <option value="pastels">Soft Pastels (Feminine)</option>
                      <option value="neutral">Neutral Tones (Professional)</option>
                      <option value="bold">Bold & Vibrant (Modern)</option>
                      <option value="custom">Custom Colors</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Advanced Business Information */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-gradient-to-br from-purple-500 to-primary p-2 rounded-xl">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-dark">Advanced Business Information</h3>
                  <span className="text-sm text-gray-500 font-medium">(Helps our developers create a more personalized website)</span>
                </div>

                <div>
                  <label className="block text-slate-dark font-semibold mb-2">Business Story & Background</label>
                  <textarea
                    name="businessStory"
                    value={formData.businessStory}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full p-4 border border-gray-300 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                    placeholder="Tell us your story - How did you start? What's your passion? This helps create compelling 'About Us' content."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-slate-dark font-semibold mb-2">Brand Personality</label>
                    <select
                      name="brandPersonality"
                      value={formData.brandPersonality}
                      onChange={handleInputChange}
                      className="w-full p-4 border border-gray-300 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    >
                      <option value="">Select your brand vibe</option>
                      <option value="luxurious">Luxurious & Premium</option>
                      <option value="friendly">Friendly & Approachable</option>
                      <option value="professional">Professional & Trustworthy</option>
                      <option value="trendy">Trendy & Modern</option>
                      <option value="relaxing">Calm & Relaxing</option>
                      <option value="glamorous">Glamorous & Bold</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-dark font-semibold mb-2">Main Call-to-Action</label>
                    <input
                      type="text"
                      name="callToAction"
                      value={formData.callToAction}
                      onChange={handleInputChange}
                      className="w-full p-4 border border-gray-300 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      placeholder="e.g., 'Book Now', 'Get Your Glow', 'Schedule Today'"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-dark font-semibold mb-2">Special Offers & Promotions</label>
                  <textarea
                    name="specialOffers"
                    value={formData.specialOffers}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full p-4 border border-gray-300 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                    placeholder="Any current promotions, packages, or special deals you offer?"
                  />
                </div>

                <div>
                  <label className="block text-slate-dark font-semibold mb-2">Business Goals & Growth Plans</label>
                  <textarea
                    name="businessGoals"
                    value={formData.businessGoals}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full p-4 border border-gray-300 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                    placeholder="What are your goals? (e.g., increase bookings by 50%, attract premium clients, expand services)"
                  />
                </div>

                <div>
                  <label className="block text-slate-dark font-semibold mb-2">Competitor Websites (for reference)</label>
                  <textarea
                    name="competitorWebsites"
                    value={formData.competitorWebsites}
                    onChange={handleInputChange}
                    rows="2"
                    className="w-full p-4 border border-gray-300 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                    placeholder="List any competitor websites you like/dislike and why"
                  />
                </div>
              </div>

              {/* Media & Content */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-gradient-to-br from-secondary to-purple-500 p-2 rounded-xl">
                    <Camera className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-dark">Media & Content</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-slate-dark font-semibold mb-2">Logo Upload</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-primary transition-colors">
                      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <input
                        type="file"
                        name="logoUpload"
                        onChange={handleInputChange}
                        accept="image/*"
                        className="w-full"
                      />
                      <p className="text-sm text-gray-500 mt-2">Upload your logo (PNG, JPG, SVG)</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-dark font-semibold mb-2">Photos Upload</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-primary transition-colors">
                      <Camera className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <input
                        type="file"
                        name="photosUpload"
                        onChange={handleInputChange}
                        accept="image/*"
                        multiple
                        className="w-full"
                      />
                      <p className="text-sm text-gray-500 mt-2">Upload your best work photos (multiple files)</p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-dark font-semibold mb-2">Team Members</label>
                  <textarea
                    name="teamMembers"
                    value={formData.teamMembers}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full p-4 border border-gray-300 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                    placeholder="List team members and their roles, e.g.:
Sarah Johnson - Owner & Master Nail Technician
Emma Davis - Lash Specialist
Maria Lopez - Esthetician"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-slate-dark font-semibold mb-2">Social Media Links</label>
                    <textarea
                      name="socialLinks"
                      value={formData.socialLinks}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full p-4 border border-gray-300 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                      placeholder="TikTok: @yourbusiness
Facebook: facebook.com/yourbusiness
YouTube: youtube.com/yourbusiness"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-dark font-semibold mb-2">Achievements & Certifications</label>
                    <textarea
                      name="achievements"
                      value={formData.achievements}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full p-4 border border-gray-300 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                      placeholder="Awards, certifications, years of experience, etc."
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-dark font-semibold mb-2">Client Testimonials</label>
                  <textarea
                    name="clientTestimonials"
                    value={formData.clientTestimonials}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full p-4 border border-gray-300 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                    placeholder="Share your best client reviews and testimonials to showcase on your website"
                  />
                </div>
              </div>

              {/* Technical Preferences */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-gradient-to-br from-primary to-secondary p-2 rounded-xl">
                    <Monitor className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-dark">Technical Preferences</h3>
                  <span className="text-sm text-gray-500 font-medium">(For our development team)</span>
                </div>

                <div>
                  <label className="block text-slate-dark font-semibold mb-2">Content Preferences</label>
                  <textarea
                    name="contentPreferences"
                    value={formData.contentPreferences}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full p-4 border border-gray-300 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                    placeholder="Any specific content you want included? Pages you need? Special features? (e.g., online booking, gallery, blog, contact forms)"
                  />
                </div>

                <div>
                  <label className="block text-slate-dark font-semibold mb-2">Special Requirements</label>
                  <textarea
                    name="technicalRequirements"
                    value={formData.technicalRequirements}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full p-4 border border-gray-300 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                    placeholder="Any technical requirements, integrations needed, or specific functionality? (e.g., payment processing, appointment scheduling, membership areas)"
                  />
                </div>
              </div>
              
              {/* Submit Button */}
              <div className="text-center pt-8 border-t border-gray-100">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-primary to-secondary text-white px-12 py-5 rounded-2xl text-xl font-bold hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
                >
                  Create My Website ✨
                </button>
                <p className="text-gray-600 mt-4 text-sm max-w-md mx-auto">
                  Our development team will review your information and contact you within 24 hours with a custom proposal
                </p>
                
                <div className="flex items-center justify-center gap-6 mt-6 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>No upfront payment</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Free revisions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Cancel anytime</span>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-dark text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="bg-gradient-to-br from-primary to-secondary p-2 rounded-xl">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold">GlowBoost Studio</span>
          </div>
          <p className="text-gray-300 mb-6">Helping beauty businesses shine online</p>
          <div className="flex justify-center space-x-6 text-sm text-gray-400">
            <span className="hover:text-primary transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-primary transition-colors cursor-pointer">Terms of Service</span>
            <span>© 2024 GlowBoost Studio</span>
          </div>
        </div>
      </footer>
    </div>
  )
} 