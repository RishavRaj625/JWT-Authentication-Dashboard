import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AdminProvider, useAdmin } from './context/AdminContext';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Dashboard } from './components/Dashboard';
import { AdminLogin } from './components/AdminLogin';
import { AdminDashboard } from './components/AdminDashboard';

// App Content with Routing Logic
const AppContent = ({ currentPage, setCurrentPage }) => {
  const { isAuthenticated: userAuth } = useAuth();
  const { isAuthenticated: adminAuth, logout: adminLogout } = useAdmin();

  // Auto redirect logic
  useEffect(() => {
    if (adminAuth && currentPage !== 'admin') {
      setCurrentPage('admin');
    } else if (userAuth && (currentPage === 'login' || currentPage === 'register')) {
      setCurrentPage('dashboard');
    } else if (!userAuth && !adminAuth && currentPage === 'dashboard') {
      setCurrentPage('login');
    } else if (!adminAuth && currentPage === 'admin') {
      setCurrentPage('admin-login');
    }
  }, [userAuth, adminAuth, currentPage, setCurrentPage]);

  // Handle admin logout and navigation
  const handleBackToLogin = () => {
    if (adminAuth) {
      adminLogout(); // Call the logout function from AdminContext if admin is logged in
    }
    setCurrentPage('login'); // Always redirect to login page
  };

  // Render appropriate component based on auth state and current page
  if (adminAuth && currentPage === 'admin') {
    return (
      <div>
        <AdminDashboard />
        <div className="fixed bottom-4 left-4">
          <button
            onClick={handleBackToLogin}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm flex items-center gap-2 shadow-xl border-2 border-white"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  if (currentPage === 'admin-login') {
    return (
      <div>
        <AdminLogin />
        <div className="fixed bottom-4 left-4">
          <button
            onClick={handleBackToLogin}
            className="px-4 py-2 text-sm text-blue-600 hover:text-blue-800 underline flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to User Login
          </button>
        </div>
      </div>
    );
  }

  if (userAuth) {
    return (
      <div>
        <Dashboard />
        <div className="fixed bottom-4 right-4">
          <button
            onClick={() => setCurrentPage('admin-login')}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm"
          >
            Admin Panel
          </button>
        </div>
      </div>
    );
  }

  if (currentPage === 'register') {
    return (
      <div>
        <Register onSwitchToLogin={() => setCurrentPage('login')} />
        <div className="fixed bottom-4 right-4">
          <button
            onClick={() => setCurrentPage('admin-login')}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm"
          >
            Admin Panel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Login onSwitchToRegister={() => setCurrentPage('register')} />
      <div className="fixed bottom-4 right-4">
        <button
          onClick={() => setCurrentPage('admin-login')}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm"
        >
          Admin Panel
        </button>
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  const [currentPage, setCurrentPage] = useState('login');

  return (
    <AuthProvider>
      <AdminProvider>
        <AppContent currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </AdminProvider>
    </AuthProvider>
  );
};

export default App;