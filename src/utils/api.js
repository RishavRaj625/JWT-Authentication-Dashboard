const API_BASE_URL = 'http://localhost:8000';

// Generic API request function
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.detail || 'API request failed');
    }

    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Authentication API calls
export const authAPI = {
  login: async (email, password) => {
    return apiRequest('/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  register: async (name, email, password) => {
    return apiRequest('/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });
  },

  getMe: async (token) => {
    return apiRequest('/me', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  },

  getDashboard: async (token) => {
    return apiRequest('/dashboard', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  },
};

// Generic authenticated request
export const authenticatedRequest = async (endpoint, token, options = {}) => {
  return apiRequest(endpoint, {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': `Bearer ${token}`,
    },
  });
};