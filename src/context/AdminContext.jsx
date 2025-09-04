import { useState, useEffect, createContext, useContext } from 'react';

// Admin Context
const AdminContext = createContext();

// Admin Provider Component
export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('adminToken'));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      // Verify admin token on app load
      fetchAdminInfo();
    }
  }, [token]);

  const fetchAdminInfo = async () => {
    try {
      const response = await fetch('http://localhost:8000/admin/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const adminData = await response.json();
        setAdmin(adminData);
      } else {
        logout();
      }
    } catch (error) {
      console.error('Error fetching admin info:', error);
      logout();
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('adminToken', data.access_token);
        setToken(data.access_token);
        setAdmin(data.admin);
        return { success: true };
      } else {
        const errorData = await response.json();
        return { success: false, error: errorData.detail };
      }
    } catch (error) {
      return { success: false, error: 'Network error' };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    setToken(null);
    setAdmin(null);
  };

  const value = {
    admin,
    token,
    loading,
    login,
    logout,
    isAuthenticated: !!admin
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};

// Hook to use admin context
export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within AdminProvider');
  }
  return context;
};