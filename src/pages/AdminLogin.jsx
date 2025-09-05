import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function AdminLogin() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin-dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();

    const success = login(phone, password);
    
    if (success) {
      navigate('/admin-dashboard');
    } else {
      setError('Invalid phone number or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form 
        onSubmit={handleLogin} 
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="mb-4">
          <label className="block mb-1 font-medium">Phone Number</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Enter phone number"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Enter password"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-amber-700 text-white py-2 rounded hover:bg-amber-600 transition-colors"
        >
          Login
        </button>
      </form>
    </div>
  );
}
