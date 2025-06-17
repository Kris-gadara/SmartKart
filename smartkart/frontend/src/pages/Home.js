import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section relative bg-gradient-to-r from-indigo-600 to-indigo-800 text-white py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-grain opacity-20"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="hero-content md:w-1/2 mb-12 md:mb-0 animate-fadeInUp">
              <div className="brand-logo flex items-center mb-6">
                <svg className="w-12 h-12 mr-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h18M3 21h18M9 3v18M15 3v18M6 8h12M6 13h12M6 18h12" />
                </svg>
                <h1 className="hero-title text-4xl md:text-5xl font-bold leading-tight">
                  Welcome to <span className="highlight bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-emerald-400">SmartKart</span>
                </h1>
              </div>
              <p className="hero-subtitle text-lg md:text-xl mb-8 opacity-90 leading-relaxed">
                Your premium destination for cutting-edge electronics and smart devices. Curated by Kris Gadara for the modern lifestyle.
              </p>
              <div className="hero-buttons flex flex-col sm:flex-row gap-4 mb-12">
                <Link to="/register" className="btn btn-primary bg-gradient-to-r from-amber-400 to-emerald-400 text-white px-8 py-4 rounded-xl font-semibold hover:transform hover:-translate-y-1 transition-all duration-300 shadow-lg">
                  Start Shopping
                </Link>
                <Link to="/customer/login" className="btn btn-secondary border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300">
                  Sign In
                </Link>
              </div>
              <div className="hero-stats flex flex-wrap justify-center gap-8">
                <div className="stat text-center">
                  <span className="stat-number text-2xl font-bold text-amber-400">10K+</span>
                  <span className="stat-label block text-sm opacity-80">Happy Customers</span>
                </div>
                <div className="stat text-center">
                  <span className="stat-number text-2xl font-bold text-amber-400">500+</span>
                  <span className="stat-label block text-sm opacity-80">Premium Products</span>
                </div>
                <div className="stat text-center">
                  <span className="stat-number text-2xl font-bold text-amber-400">24/7</span>
                  <span className="stat-label block text-sm opacity-80">Support</span>
                </div>
              </div>
            </div>
            <div className="hero-image md:w-1/2 relative h-96">
              <div className="floating-devices absolute inset-0 flex items-center justify-center">
                <div className="relative w-80 h-80">
                  {[
                    { icon: 'M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z', className: 'top-20 left-20', delay: '0s' },
                    { icon: 'M4 6h16M4 10h16M4 14h16M4 18h16', className: 'top-60 right-20', delay: '1.5s' },
                    { icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', className: 'bottom-20 left-30', delay: '3s' },
                    { icon: 'M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z', className: 'top-40 right-10', delay: '4.5s' },
                    { icon: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z', className: 'top-10 right-40', delay: '2s' },
                  ].map((device, i) => (
                    <div key={i} className={`device absolute ${device.className} bg-white/10 backdrop-blur-md p-6 rounded-2xl animate-float`} style={{ animationDelay: device.delay }}>
                      <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={device.icon} />
                      </svg>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section py-24 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="section-title text-3xl md:text-4xl font-bold text-gray-900 text-center mb-6">Why Choose SmartKart?</h2>
          <p className="section-subtitle text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">Experience the difference with our premium service</p>
          <div className="features-grid grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: 'M13 10V3L4 14h7v7l9-11h-7z', title: 'Premium Selection', desc: 'Curated collection of innovative tech products from top brands.' },
              { icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', title: 'Secure Shopping', desc: 'Bank-grade security with encrypted transactions.' },
              { icon: 'M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z', title: 'Fast Delivery', desc: 'Express shipping with real-time tracking.' },
              { icon: 'M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.379c.484 0 .951.328 1.134.748l.436 1.092', title: 'Premium Support', desc: '24/7 customer support with expert assistance.' },
            ].map((feature, i) => (
              <div key={i} className="feature-card p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-gray-100">
                <svg className="feature-icon w-12 h-12 text-indigo-600 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                </svg>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="section-title text-3xl md:text-4xl font-bold text-gray-900 text-center mb-6">Shop by Category</h2>
          <p className="section-subtitle text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">Discover our premium product categories</p>
          <div className="categories-grid grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: 'M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z', title: 'Smartphones', desc: 'Latest mobile devices with cutting-edge technology' },
              { icon: 'M4 6h16M4 10h16M4 14h16M4 18h16', title: 'Laptops', desc: 'Powerful computing solutions for work and creativity' },
              { icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', title: 'Smartwatches', desc: 'Advanced wearable technology for health and fitness' },
              { icon: 'M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z', title: 'Audio', desc: 'Premium sound experience with noise cancellation' },
            ].map((category, i) => (
              <div key={i} className="category-card p-8 bg-white rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-gray-100 group">
                <svg className="category-icon w-12 h-12 text-indigo-600 mb-6 group-hover:text-indigo-700 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={category.icon} />
                </svg>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{category.title}</h3>
                <p className="text-gray-600 mb-6">{category.desc}</p>
                <Link to="/customer/login" className="category-link text-indigo-600 font-semibold group-hover:text-indigo-700 transition-colors">Explore →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section py-24 bg-gradient-to-r from-indigo-600 to-indigo-800 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-grain opacity-20"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="cta-content">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Experience SmartKart?</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">Join thousands of satisfied customers and discover amazing premium products</p>
            <div className="cta-buttons flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register" className="btn btn-primary btn-large bg-gradient-to-r from-amber-400 to-emerald-400 text-white px-10 py-4 rounded-xl font-semibold hover:transform hover:-translate-y-1 transition-all duration-300 shadow-lg">
                Create Account
              </Link>
              <Link to="/customer/login" className="btn btn-outline btn-large border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white px-10 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer bg-gray-900 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="footer-content grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="footer-section">
              <div className="footer-brand flex items-center mb-6">
                <svg className="w-8 h-8 mr-3 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h18M3 21h18M9 3v18M15 3v18M6 8h12M6 13h12M6 18h12" />
                </svg>
                <h3 className="text-xl font-bold">SmartKart</h3>
              </div>
              <p className="text-gray-400 mb-6">Your premium destination for cutting-edge electronics and smart devices. Curated by Kris Gadara.</p>
              <div className="social-links flex gap-4">
                {[
                  { path: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z', href: '#' },
                  { path: 'M4 8a8 8 0 1112.93 6.915l5.378 5.378-1.414 1.414-5.378-5.378A8 8 0 014 8z', href: '#' },
                  { path: 'M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c1.1 3.1 4.4 5.2 8 5-1.4-3.8.3-8 4-10 2.2-.7 4.7.3 5 4z', href: '#' },
                  { path: 'M16 8a6 6 0 11-12 0 6 6 0 0112 0zM4 16c0-1.1.3-2.1.8-3H4a4 4 0 00-4 4v3h4v-3zM20 16v3h4v-3a4 4 0 00-4-4h-.8c.5.9.8 1.9.8 3z', href: '#' },
                ].map((social, i) => (
                  <a key={i} href={social.href} className="social-link text-gray-400 hover:text-amber-400 transform hover:scale-110 transition-all">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d={social.path} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
            <div className="footer-section">
              <h4 className="text-amber-400 font-semibold mb-6">Quick Links</h4>
              {[
                { to: '/customer/login', text: 'Customer Login' },
                { to: '/register', text: 'Create Account' },
                { to: '/admin/login', text: 'Admin Panel' },
                { to: '/dashboard', text: 'My Dashboard' },
              ].map((link, i) => (
                <Link key={i} to={link.to} className="block text-gray-400 hover:text-amber-400 mb-3 transition-colors">{link.text}</Link>
              ))}
            </div>
            <div className="footer-section">
              <h4 className="text-amber-400 font-semibold mb-6">Support</h4>
              <p className="text-gray-400 mb-3">24/7 Customer Service</p>
              <p className="text-gray-400 mb-3">Email: smartkart@gmail.com</p>
              <p className="text-gray-400 mb-3">Phone: 9313929324</p>
              <p className="text-gray-400">Live Chat Available</p>
            </div>
            <div className="footer-section">
              <h4 className="text-amber-400 font-semibold mb-6">Newsletter</h4>
              <p className="text-gray-400 mb-6">Stay updated with latest products and offers</p>
              <div className="newsletter-form flex flex-col gap-3">
                <input type="email" placeholder="Enter your email" className="bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700 focus:outline-none focus:border-amber-400 transition-colors" />
                <button className="newsletter-btn bg-amber-400 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-amber-500 transition-colors">Subscribe</button>
              </div>
            </div>
          </div>
          <div className="footer-bottom border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm">
            © 2025 SmartKart. All rights reserved. | Designed by Kris Gadara
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;