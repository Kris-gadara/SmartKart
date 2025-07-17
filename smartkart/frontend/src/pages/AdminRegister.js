import React, { useState } from 'react';
import './AdminRegister.css';
import { useNavigate } from 'react-router-dom';

function AdminRegister() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleAdminRegisterSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, password, role: 'admin' })
      });
      const data = await response.json();
      if (data.success) {
        setMessage('Admin registered successfully! Please login.');
        setTimeout(() => navigate('/admin/login'), 1500);
      } else {
        setMessage(data.message || 'Registration failed.');
      }
    } catch (error) {
      setMessage('An error occurred during registration.');
    }
  };

  return (
    <div className="admin-register-container">
      <svg className="bg-svg" viewBox="0 0 1440 320">
        <path
          fill="#4f46e5"
          fillOpacity="0.2"
          d="M0,96L48,101.3C96,107,192,117,288,138.7C384,160,480,192,576,176C672,160,768,96,864,80C960,64,1056,96,1152,122.7C1248,149,1344,171,1392,181.3L1440,192V0H0Z"
        ></path>
      </svg>

      <form className="admin-register-form" onSubmit={handleAdminRegisterSubmit}>
        <h2 className="form-title">Admin Register</h2>

        <label>Name</label>
        <input type="text" value={name} onChange={e => setName(e.target.value)} required placeholder="Enter full name" />

        <label>Email</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="Enter email" />

        <label>Phone</label>
        <input type="text" value={phone} onChange={e => setPhone(e.target.value)} required placeholder="Enter phone number" />

        <label>Password</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="Create password" />

        <button type="submit">Register</button>

        {message && <div className="admin-register-message">{message}</div>}

        <div className="admin-register-links">
          <a href="/admin/login">Back to Admin Login</a>
        </div>
      </form>
    </div>
  );
}

export default AdminRegister;
