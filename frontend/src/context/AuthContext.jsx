import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) return { user: null, login: () => {}, logout: () => {}, loading: false };
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      axios.get(`${import.meta.env.VITE_API_URL}/auth/me`)
        .then(res => setUser(res.data))
        .catch(() => localStorage.removeItem('token'))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, { email, password });
      localStorage.setItem('token', res.data.token);
      setUser(res.data.user);
      return { success: true };
    } catch (err) {
      return { success: false, msg: err.response?.data?.msg };
    }
  };


const signup = async (userData) => {
  try {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`, userData);
    const { token, user } = res.data;
    
    localStorage.setItem('token', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    
    setUser(user);
    return { success: true }; 
  } catch (err) {
    console.error('Signup error details:', err.response?.data);
    return { 
      success: false, 
      msg: err.response?.data?.msg || 'Signup failed. Please try again.' 
    };
  }
};

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    window.location.href = '/';  
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;