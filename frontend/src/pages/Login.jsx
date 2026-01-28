import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import axios from 'axios'; 

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  
  const result = await login(formData.email, formData.password);
  
  setLoading(false);
  
  if (result && result.success) {
    const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    
    window.location.href = '/jobs';
  } else {
    alert(result?.msg || 'Login failed');
  }
};



  return (
    <div className="max-w-md mx-auto mt-20">
      <div className="card">
        <h2 className="text-3xl font-bold text-center mb-8">Welcome Back</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
            value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
            value={formData.password}
            onChange={e => setFormData({ ...formData, password: e.target.value })}
            required
          />
          <button type="submit" disabled={loading} className="btn-primary w-full text-lg py-4">
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
        <p className="text-center mt-6 text-gray-600">
          No account? <Link to="/signup" className="text-blue-600 hover:underline font-medium">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
