import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero-section" id="hero" data-animate>
        <div className="hero-background">
          <svg className="hero-svg" viewBox="0 0 1440 800" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <defs>
              <linearGradient id="hero-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e40af" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#60a5fa" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0.4" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
                <feMerge>
                  <feMergeNode />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <path
              d="M0,200 Q360,100 720,200 T1440,200 L1440,800 L0,800 Z"
              fill="url(#hero-gradient)"
              opacity="0.2"
              filter="url(#glow)"
            />
            <circle cx="200" cy="150" r="100" fill="url(#hero-gradient)" opacity="0.15" filter="url(#glow)" />
            <circle cx="1240" cy="600" r="120" fill="url(#hero-gradient)" opacity="0.15" filter="url(#glow)" />
            <path
              d="M0,600 Q360,500 720,600 T1440,600 L1440,800 L0,800 Z"
              fill="url(#hero-gradient)"
              opacity="0.1"
              filter="url(#glow)"
            />
          </svg>
        </div>
        <div className="hero-content">
          <div className="hero-text">
            <div className="hero-badge">
              <span>✨ Premium Electronics Store</span>
            </div>
            <h1 className={`hero-title ${isVisible.hero ? 'animate-in' : ''}`}>
              Welcome to <span className="gradient-text">SmartKart</span>
            </h1>
            <p className={`hero-subtitle ${isVisible.hero ? 'animate-in delay-1' : ''}`}>
              Your destination for premium electronics and smart living solutions, crafted with passion by <strong>Kris Gadara</strong>
            </p>
            <div className={`hero-buttons ${isVisible.hero ? 'animate-in delay-2' : ''}`}>
              <Link to="/register" className="btn primary metallic-shine">
                <span className="btn-text">Start Shopping</span>
                <div className="btn-shine"></div>
              </Link>
              <Link to="/customer/login" className="btn secondary glass-effect">
                <span className="btn-text">Sign In</span>
              </Link>
            </div>
            <div className={`stats-container ${isVisible.hero ? 'animate-in delay-3' : ''}`}>
              <div className="stat-item">
                <div className="stat-number">10K+</div>
                <div className="stat-label">Happy Customers</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">500+</div>
                <div className="stat-label">Premium Products</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">24/7</div>
                <div className="stat-label">Expert Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section" id="features" data-animate>
        <div className="container">
          <svg className="section-svg" viewBox="0 0 1440 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="feature-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#60a5fa" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#1e40af" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            <path d="M0,100 Q360,50 720,100 T1440,100 L1440,200 L0,200 Z" fill="url(#feature-gradient)" />
          </svg>
          <div className="section-header">
            <h2 className={`section-title ${isVisible.features ? 'animate-in' : ''}`}>
              Why Choose SmartKart?
            </h2>
            <p className={`section-subtitle ${isVisible.features ? 'animate-in delay-1' : ''}`}>
              Experience premium service and unmatched quality
            </p>
          </div>
          <div className="features-grid">
            <div className={`feature-card ${isVisible.features ? 'animate-in delay-1' : ''}`}>
              <div className="feature-icon">
                <div className="icon-wrapper star">⭐</div>
              </div>
              <h3>Premium Selection</h3>
              <p>Carefully curated collection of the finest electronics and smart tech innovations.</p>
            </div>
            <div className={`feature-card ${isVisible.features ? 'animate-in delay-2' : ''}`}>
              <div className="feature-icon">
                <div className="icon-wrapper shield">🛡️</div>
              </div>
              <h3>Secure Shopping</h3>
              <p>Bank-level encryption and advanced security for completely worry-free transactions.</p>
            </div>
            <div className={`feature-card ${isVisible.features ? 'animate-in delay-3' : ''}`}>
              <div className="feature-icon">
                <div className="icon-wrapper rocket">🚀</div>
              </div>
              <h3>Lightning Delivery</h3>
              <p>Ultra-fast shipping to get your premium gadgets delivered in record time.</p>
            </div>
            <div className={`feature-card ${isVisible.features ? 'animate-in delay-4' : ''}`}>
              <div className="feature-icon">
                <div className="icon-wrapper support">💬</div>
              </div>
              <h3>24/7 Expert Support</h3>
              <p>Round-the-clock assistance from our dedicated team of technology experts.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section" id="categories" data-animate>
        <div className="container">
          <div className="section-header">
            <h2 className={`section-title ${isVisible.categories ? 'animate-in' : ''}`}>
              Shop by Category
            </h2>
            <p className={`section-subtitle ${isVisible.categories ? 'animate-in delay-1' : ''}`}>
              Discover our trending product categories
            </p>
          </div>
          <div className="category-grid">
            <div className={`category-card ${isVisible.categories ? 'animate-in delay-1' : ''}`}>
              <svg className="category-svg" viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="cat-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0.2" />
                  </linearGradient>
                </defs>
                <path d="M0,150 Q75,100 150,150 T300,150 L300,200 L0,200 Z" fill="url(#cat-gradient-1)" />
              </svg>
              <div className="category-background">
                <div className="category-gradient gradient-1"></div>
              </div>
              <div className="category-content">
                <div className="category-icon">📱</div>
                <h4>Smartphones</h4>
                <p>Latest mobile technology and innovations</p>
                <Link to="/customer/login" className="category-link">
                  Explore Collection →
                </Link>
              </div>
            </div>
            <div className={`category-card ${isVisible.categories ? 'animate-in delay-2' : ''}`}>
              <svg className="category-svg" viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="cat-gradient-2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#1e40af" stopOpacity="0.2" />
                  </linearGradient>
                </defs>
                <path d="M0,150 Q75,100 150,150 T300,150 L300,200 L0,200 Z" fill="url(#cat-gradient-2)" />
              </svg>
              <div className="category-background">
                <div className="category-gradient gradient-2"></div>
              </div>
              <div className="category-content">
                <div className="category-icon">💻</div>
                <h4>Laptops</h4>
                <p>Power and performance for work and play</p>
                <Link to="/customer/login" className="category-link">
                  Explore Collection →
                </Link>
              </div>
            </div>
            <div className={`category-card ${isVisible.categories ? 'animate-in delay-3' : ''}`}>
              <svg className="category-svg" viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="cat-gradient-3" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1e40af" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.2" />
                  </linearGradient>
                </defs>
                <path d="M0,150 Q75,100 150,150 T300,150 L300,200 L0,200 Z" fill="url(#cat-gradient-3)" />
              </svg>
              <div className="category-background">
                <div className="category-gradient gradient-3"></div>
              </div>
              <div className="category-content">
                <div className="category-icon">⌚</div>
                <h4>Smartwatches</h4>
                <p>Health, fitness, and style on your wrist</p>
                <Link to="/customer/login" className="category-link">
                  Explore Collection →
                </Link>
              </div>
            </div>
            <div className={`category-card ${isVisible.categories ? 'animate-in delay-4' : ''}`}>
              <svg className="category-svg" viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="cat-gradient-4" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0.2" />
                  </linearGradient>
                </defs>
                <path d="M0,150 Q75,100 150,150 T300,150 L300,200 L0,200 Z" fill="url(#cat-gradient-4)" />
              </svg>
              <div className="category-background">
                <div className="category-gradient gradient-4"></div>
              </div>
              <div className="category-content">
                <div className="category-icon">🎧</div>
                <h4>Audio</h4>
                <p>Premium sound experience wherever you go</p>
                <Link to="/customer/login" className="category-link">
                  Explore Collection →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section" id="cta" data-animate>
        <div className="cta-background">
          <svg className="cta-svg" viewBox="0 0 1440 400" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="cta-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e40af" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#60a5fa" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            <path d="M0,200 Q360,100 720,200 T1440,200 L1440,400 L0,400 Z" fill="url(#cta-gradient)" />
          </svg>
        </div>
        <div className="container">
          <div className="cta-content">
            <h2 className={`cta-title ${isVisible.cta ? 'animate-in' : ''}`}>
              Ready to Experience SmartKart?
            </h2>
            <p className={`cta-subtitle ${isVisible.cta ? 'animate-in delay-1' : ''}`}>
              Join thousands of satisfied customers in the smart living revolution
            </p>
            <div className={`cta-buttons ${isVisible.cta ? 'animate-in delay-2' : ''}`}>
              <Link to="/register" className="btn primary metallic-shine">
                <span className="btn-text">Create Account</span>
                <div className="btn-shine"></div>
              </Link>
              <Link to="/customer/login" className="btn secondary glass-effect">
                <span className="btn-text">Sign In</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <h3 className="brand-name">SmartKart</h3>
              <p className="brand-description">
                Curated by <strong>Kris Gadara</strong> — Bringing premium electronics and smart living solutions to your doorstep.
              </p>
              <div className="social-icons">
                <a href="#" className="social-link"><span>📘</span></a>
                <a href="#" className="social-link"><span>📷</span></a>
                <a href="#" className="social-link"><span>🐦</span></a>
                <a href="#" className="social-link"><span>💼</span></a>
              </div>
            </div>
            <div className="footer-links">
              <h4>Quick Links</h4>
              <ul>
                <li><Link to="/customer/login">Customer Login</Link></li>
                <li><Link to="/register">Create Account</Link></li>
                <li><Link to="/admin/login">Admin Panel</Link></li>
                <li><Link to="/dashboard">My Dashboard</Link></li>
              </ul>
            </div>
            <div className="footer-support">
              <h4>Contact & Support</h4>
              <ul>
                <li><span>📧</span> smartkart@gmail.com</li>
                <li><span>📞</span> 9313929324</li>
                <li><span>💬</span> Live Chat Available</li>
                <li><span>🕒</span> 24/7 Support</li>
              </ul>
            </div>
            <div className="footer-newsletter">
              <h4>Stay Updated</h4>
              <p>Subscribe for exclusive deals and product updates</p>
              <div className="newsletter-form">
                <input type="email" placeholder="Enter your email" />
                <button className="subscribe-btn">Subscribe</button>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="footer-divider"></div>
            <p>© 2025 SmartKart. All rights reserved. Made with ❤️ by Kris Gadara</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;