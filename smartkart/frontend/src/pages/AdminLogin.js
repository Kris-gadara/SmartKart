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

    console.log('Admin login form submitted', { email, password });

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, role: 'admin' }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.token) {
          localStorage.setItem('adminToken', data.token); 
          setMessage('Admin login successful!');
        
          const from = location.state?.from || '/admin/dashboard';
          navigate(from, { replace: true });
        } else {
          setMessage('Login failed: No token received');
        }
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
      <h2>Admin Login</h2>
      <form className="admin-login-form" onSubmit={handleAdminLoginSubmit}>
        <div className="form-group">
          <label htmlFor="email" className="form-label">Email:</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            className="form-input" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">Password:</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            className="form-input" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit" className="admin-login-button">Login</button>
      </form>

      {message && <div className="login-message">{message}</div>}

      <div className="admin-login-links">
        <Link to="/" className="back-to-home-button">
          <button>Back to Home</button>
        </Link>
      </div>
    </div>
  );
}

export default AdminLogin; 