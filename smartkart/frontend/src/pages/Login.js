import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './CustomerLogin.css'; // Will use same enhanced CSS

function Login() {
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
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        localStorage.setItem('token', data.token);
        setMessage('Login successful!');
        const from = location.state?.from || '/dashboard';
        navigate(from, { replace: true });
      } else {
        setMessage(data.message || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setMessage('An error occurred during login. Please try again later.');
    }
  };

  return (
    <div className="customer-login-container">
      <svg className="bg-svg" viewBox="0 0 1440 320">
        <path
          fill="#3b82f6"
          fillOpacity="0.2"
          d="M0,128L80,122.7C160,117,320,107,480,122.7C640,139,800,181,960,186.7C1120,192,1280,160,1360,144L1440,128V0H0Z"
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

export default Login;
