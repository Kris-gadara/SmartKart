import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css';

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [role] = useState('customer');
  const [message, setMessage] = useState('');

  const handleRegisterSubmit = async (event) => {
    event.preventDefault();
    setMessage('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, password, role }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('User registered successfully!');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setMessage(data.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setMessage('An error occurred during registration. Please try again later.');
    }
  };

  return (
    <div className="register-container">
      <svg className="bg-svg" viewBox="0 0 1440 320">
        <path
          fill="#06b6d4"
          fillOpacity="0.2"
          d="M0,128L60,144C120,160,240,192,360,197.3C480,203,600,181,720,160C840,139,960,117,1080,122.7C1200,128,1320,160,1380,176L1440,192V0H0Z"
        ></path>
      </svg>

      <form className="register-form" onSubmit={handleRegisterSubmit}>
        <h2 className="form-title">Customer Register</h2>

        <div className="form-group">
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Your name" />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Your email" />
        </div>

        <div className="form-group">
          <label>Phone:</label>
          <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone number" />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Create a password" />
        </div>

        <div className="form-group">
          <label>Role:</label>
          <input type="text" value={role} disabled />
        </div>

        <button type="submit" className="register-button">Register</button>

        {message && <p className="registration-message">{message}</p>}

        <div className="button-group">
          <Link to="/admin/login">
            <button className="link-button secondary">Go to Admin Login</button>
          </Link>
          <Link to="/login">
            <button className="link-button">Already Registered? Login</button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Register;
