import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './AdminLogin.css';

function AdminLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    if (adminToken) {
      const from = location.state?.from || '/admin/dashboard';
      navigate(from, { replace: true });
    }
  }, [navigate, location]);

  const handleAdminLoginSubmit = async (event) => {
    event.preventDefault();
    setMessage('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role: 'admin' }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        localStorage.setItem('adminToken', data.token);
        setMessage('Admin login successful!');
        const from = location.state?.from || '/admin/dashboard';
        navigate(from, { replace: true });
      } else {
        setMessage(data.message || 'Admin login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error during admin login:', error);
      setMessage('An error occurred during admin login. Please try again later.');
    }
  };

  return (
    <div className="admin-login-container">
      <svg className="bg-svg" viewBox="0 0 1440 320">
        <path
          fill="#4f46e5"
          fillOpacity="0.2"
          d="M0,96L48,101.3C96,107,192,117,288,138.7C384,160,480,192,576,176C672,160,768,96,864,80C960,64,1056,96,1152,122.7C1248,149,1344,171,1392,181.3L1440,192V0H0Z"
        ></path>
      </svg>

      <form className="admin-login-form" onSubmit={handleAdminLoginSubmit}>
        <h2 className="form-title">Admin Login</h2>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter admin email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter password"
          />
        </div>

        <button type="submit" className="admin-login-button">Login</button>

        {message && <p className="login-message">{message}</p>}

        <div className="admin-login-links">
          <Link to="/">
            <button className="link-button">Back to Home</button>
          </Link>
          <Link to="/admin/register">
            <button className="link-button secondary">Register as Admin</button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default AdminLogin;
