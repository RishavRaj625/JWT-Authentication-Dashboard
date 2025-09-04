import { useState, useEffect } from 'react';

export const UsersActivity = ({ token }) => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const [timeRange, setTimeRange] = useState('24h');

  useEffect(() => {
    fetchActivities();
  }, [filter, timeRange]);

  const fetchActivities = async () => {
    try {
      setLoading(true);
        const response = await fetch(`https://jwt-authentication-dashboard.onrender.com/admin/activities?filter=${filter}&time_range=${timeRange}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setActivities(data.activities || []);
      } else {
        setError('Failed to fetch activities');
      }
    } catch (error) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  const getActivityIcon = (type) => {
    const iconMap = {
      'login': '🔑',
      'logout': '🚪',
      'register': '👤',
      'post_create': '📝',
      'post_view': '👁️',
      'post_like': '❤️',
      'profile_update': '✏️',
      'password_change': '🔒'
    };
    return iconMap[type] || '📊';
  };

  const getActivityColor = (type) => {
    const colorMap = {
      'login': 'bg-green-100 text-green-800',
      'logout': 'bg-gray-100 text-gray-800',
      'register': 'bg-blue-100 text-blue-800',
      'post_create': 'bg-purple-100 text-purple-800',
      'post_view': 'bg-yellow-100 text-yellow-800',
      'post_like': 'bg-red-100 text-red-800',
      'profile_update': 'bg-indigo-100 text-indigo-800',
      'password_change': 'bg-orange-100 text-orange-800'
    };
    return colorMap[type] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex space-x-4">
                <div className="rounded-full bg-gray-200 h-10 w-10"></div>
                <div className="flex-1 space-y-2 py-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header and Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">User Activity</h2>
            <p className="mt-1 text-sm text-gray-600">
              Monitor all user activities across the platform
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-4">
            {/* Activity Filter */}
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Activities</option>
              <option value="login">Login Events</option>
              <option value="posts">Post Activities</option>
              <option value="profile">Profile Changes</option>
              <option value="security">Security Events</option>
            </select>

            {/* Time Range Filter */}
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="1h">Last Hour</option>
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="all">All Time</option>
            </select>

            <button
              onClick={fetchActivities}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Refresh
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
          {error}
          <button
            onClick={fetchActivities}
            className="ml-4 text-red-800 underline hover:no-underline"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Activity Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="text-2xl mr-3">🔑</div>
            <div>
              <p className="text-sm font-medium text-gray-600">Today's Logins</p>
              <p className="text-2xl font-semibold text-gray-900">
                {activities.filter(a => a.type === 'login' && new Date(a.timestamp).toDateString() === new Date().toDateString()).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="text-2xl mr-3">📝</div>
            <div>
              <p className="text-sm font-medium text-gray-600">Posts Created</p>
              <p className="text-2xl font-semibold text-gray-900">
                {activities.filter(a => a.type === 'post_create').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="text-2xl mr-3">👁️</div>
            <div>
              <p className="text-sm font-medium text-gray-600">Page Views</p>
              <p className="text-2xl font-semibold text-gray-900">
                {activities.filter(a => a.type === 'post_view').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="text-2xl mr-3">👤</div>
            <div>
              <p className="text-sm font-medium text-gray-600">Active Users</p>
              <p className="text-2xl font-semibold text-gray-900">
                {new Set(activities.map(a => a.user_id)).size}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Feed */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Recent Activity Feed</h3>
        </div>
        
        <div className="divide-y divide-gray-200">
          {activities.length === 0 ? (
            <div className="p-8 text-center">
              <div className="text-4xl mb-4">🔍</div>
              <p className="text-gray-500">No activities found for the selected criteria.</p>
            </div>
          ) : (
            activities.slice(0, 50).map((activity, index) => (
              <div key={index} className="p-6 hover:bg-gray-50">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className={`inline-flex items-center justify-center h-8 w-8 rounded-full ${getActivityColor(activity.type)}`}>
                      <span className="text-sm">{getActivityIcon(activity.type)}</span>
                    </div>
                  </div>
                  
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900">
                        {activity.user_name || 'Unknown User'}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(activity.timestamp).toLocaleString()}
                      </p>
                    </div>
                    
                    <div className="mt-1">
                      <p className="text-sm text-gray-600">
                        {activity.description}
                      </p>
                      
                      {activity.details && (
                        <div className="mt-2 text-xs text-gray-500 bg-gray-50 rounded p-2">
                          <strong>Details:</strong> {JSON.stringify(activity.details, null, 2)}
                        </div>
                      )}
                      
                      <div className="mt-2 flex items-center space-x-4 text-xs text-gray-500">
                        <span>IP: {activity.ip_address || 'Unknown'}</span>
                        <span>User Agent: {activity.user_agent?.substring(0, 50) || 'Unknown'}...</span>
                        {activity.location && <span>Location: {activity.location}</span>}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-shrink-0">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getActivityColor(activity.type)}`}>
                      {activity.type.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        {activities.length > 50 && (
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
            <p className="text-sm text-gray-600 text-center">
              Showing first 50 activities. Use filters to narrow down results.
            </p>
          </div>
        )}
      </div>
    </div>
  );

};
