import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Navbar = () => {
  const context = useContext(AuthContext);
  const { user, logout } = context || {};
  const navigate = useNavigate();

  const handleLogout = () => {
    if (logout) logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-lg rounded-2xl p-6 mb-8">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          JobIntern Hub
        </Link>
        <div className="flex items-center space-x-6">
          <Link to="/jobs" className="font-medium text-gray-700 hover:text-blue-600">
            Jobs
          </Link>
          {user ? (
            <>
              <Link 
                to={`/dashboard/${user.role}`} 
                className="font-medium text-gray-700 hover:text-blue-600"
              >
                Dashboard
              </Link>
              <span className="text-sm font-medium text-gray-600">
                 {user.name || user.email?.split('@')[0] || 'User'}
              </span>
              <button 
                onClick={handleLogout} 
                className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg font-medium text-sm transition-all duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className="font-medium text-gray-700 hover:text-blue-600"
              >
                Login
              </Link>
              <Link 
                to="/signup" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium text-sm transition-all duration-200"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
