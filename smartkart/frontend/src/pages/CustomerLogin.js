import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './CustomerLogin.css';

function CustomerLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const from = location.state?.from || '/dashboard';
      navigate(from, { replace: true });
    }
  }, [navigate, location]);

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    setMessage('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role: 'customer' }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        localStorage.setItem('token', data.token);
        setMessage('Login successful!');
        const from = location.state?.from || '/dashboard';
        navigate(from, { replace: true });
      } else {
        setMessage(data.message || 'Login failed: Invalid credentials.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="customer-login-container">
      <svg className="bg-svg" viewBox="0 0 1440 320">
        <path
          fill="#10b981"
          fillOpacity="0.2"
          d="M0,96L60,122.7C120,149,240,203,360,213.3C480,224,600,192,720,170.7C840,149,960,139,1080,154.7C1200,171,1320,213,1380,234.7L1440,256V0H0Z"
        ></path>
      </svg>

      <form className="customer-login-form" onSubmit={handleLoginSubmit}>
        <h2 className="form-title">Customer Login</h2>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
          />
        </div>

        <button type="submit" className="customer-login-button">Login</button>

        {message && <p className="login-message">{message}</p>}

        <div className="register-link-container">
          <Link to="/register">
            <button className="link-button">New User? Register</button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default CustomerLogin;
