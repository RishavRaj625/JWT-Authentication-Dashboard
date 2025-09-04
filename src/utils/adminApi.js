const API_BASE_URL = 'http://localhost:8000';

// Generic admin API request function
const adminApiRequest = async (endpoint, token, options = {}) => {
  const url = `${API_BASE_URL}/admin${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
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

// Admin Authentication API
export const adminAuthAPI = {
  login: async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/admin/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      return { success: true, data };
    } else {
      const errorData = await response.json();
      return { success: false, error: errorData.detail };
    }
  },

  getMe: async (token) => {
    return adminApiRequest('/me', token);
  },

  getDashboard: async (token) => {
    return adminApiRequest('/dashboard', token);
  },
};

// Users Management API
export const adminUsersAPI = {
  getUsers: async (token, params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return adminApiRequest(`/users?${queryString}`, token);
  },

  activateUser: async (token, userId) => {
    return adminApiRequest(`/users/${userId}/activate`, token, {
      method: 'POST',
    });
  },

  deactivateUser: async (token, userId) => {
    return adminApiRequest(`/users/${userId}/deactivate`, token, {
      method: 'POST',
    });
  },

  deleteUser: async (token, userId) => {
    return adminApiRequest(`/users/${userId}`, token, {
      method: 'DELETE',
    });
  },

  getUserDetails: async (token, userId) => {
    return adminApiRequest(`/users/${userId}`, token);
  },

  updateUser: async (token, userId, userData) => {
    return adminApiRequest(`/users/${userId}`, token, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  },
};

// Activity Monitoring API
export const adminActivityAPI = {
  getActivities: async (token, params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return adminApiRequest(`/activities?${queryString}`, token);
  },

  getUserActivity: async (token, userId, params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return adminApiRequest(`/users/${userId}/activities?${queryString}`, token);
  },

  getActivityStats: async (token, timeRange = '24h') => {
    return adminApiRequest(`/activities/stats?time_range=${timeRange}`, token);
  },

  exportActivities: async (token, params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return adminApiRequest(`/activities/export?${queryString}`, token);
  },
};

// System Statistics API
export const adminStatsAPI = {
  getSystemStats: async (token) => {
    return adminApiRequest('/stats', token);
  },

  getUserGrowth: async (token, period = '30d') => {
    return adminApiRequest(`/stats/user-growth?period=${period}`, token);
  },

  getEngagementStats: async (token, period = '30d') => {
    return adminApiRequest(`/stats/engagement?period=${period}`, token);
  },

  getPerformanceMetrics: async (token) => {
    return adminApiRequest('/stats/performance', token);
  },
};

// Content Management API
export const adminContentAPI = {
  getPosts: async (token, params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return adminApiRequest(`/posts?${queryString}`, token);
  },

  deletePost: async (token, postId) => {
    return adminApiRequest(`/posts/${postId}`, token, {
      method: 'DELETE',
    });
  },

  updatePost: async (token, postId, postData) => {
    return adminApiRequest(`/posts/${postId}`, token, {
      method: 'PUT',
      body: JSON.stringify(postData),
    });
  },

  flagPost: async (token, postId, reason) => {
    return adminApiRequest(`/posts/${postId}/flag`, token, {
      method: 'POST',
      body: JSON.stringify({ reason }),
    });
  },
};

// Settings Management API
export const adminSettingsAPI = {
  getSettings: async (token) => {
    return adminApiRequest('/settings', token);
  },

  updateSettings: async (token, settings) => {
    return adminApiRequest('/settings', token, {
      method: 'PUT',
      body: JSON.stringify(settings),
    });
  },

  getSystemHealth: async (token) => {
    return adminApiRequest('/health', token);
  },

  clearCache: async (token) => {
    return adminApiRequest('/cache/clear', token, {
      method: 'POST',
    });
  },
};

// Notifications API
export const adminNotificationsAPI = {
  sendBroadcast: async (token, message) => {
    return adminApiRequest('/notifications/broadcast', token, {
      method: 'POST',
      body: JSON.stringify(message),
    });
  },

  sendUserNotification: async (token, userId, message) => {
    return adminApiRequest(`/notifications/user/${userId}`, token, {
      method: 'POST',
      body: JSON.stringify(message),
    });
  },

  getNotificationHistory: async (token, params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return adminApiRequest(`/notifications/history?${queryString}`, token);
  },
};