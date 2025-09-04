import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { pythonContent } from '../readme-files/python-readme';
import { sqlContent } from '../readme-files/sql-readme';

export const Dashboard = () => {
  const { user, logout, token } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentView, setCurrentView] = useState('home');
  const [selectedContent, setSelectedContent] = useState(null);
  const [copiedCode, setCopiedCode] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('https://jwt-authentication-dashboard.onrender.com', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setDashboardData(data);
      } else {
        setError('Failed to fetch dashboard data');
      }
    } catch (error) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCode(text);
      setTimeout(() => setCopiedCode(''), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const parseMarkdownContent = (content) => {
    // Split content into sections
    const sections = content.split('---').filter(section => section.trim());
    
    return sections.map((section, index) => {
      const lines = section.trim().split('\n');
      let currentSection = {
        title: '',
        theory: '',
        code: '',
        type: 'content'
      };
      
      let isCodeBlock = false;
      let isTheory = false;
      let codeBuffer = [];
      let theoryBuffer = [];
      
      lines.forEach(line => {
        const trimmedLine = line.trim();
        
        if (trimmedLine.startsWith('# ') || trimmedLine.startsWith('## ')) {
          currentSection.title = trimmedLine.replace(/^#+\s/, '');
        } else if (trimmedLine === '### Theory') {
          isTheory = true;
        } else if (trimmedLine === '### Code Examples' || trimmedLine.startsWith('```')) {
          isTheory = false;
          if (trimmedLine.startsWith('```')) {
            isCodeBlock = !isCodeBlock;
            if (!isCodeBlock && codeBuffer.length > 0) {
              currentSection.code = codeBuffer.join('\n');
              codeBuffer = [];
            }
            return;
          }
        } else if (isCodeBlock) {
          codeBuffer.push(line);
        } else if (isTheory && trimmedLine && !trimmedLine.startsWith('#')) {
          theoryBuffer.push(trimmedLine);
        }
      });
      
      if (theoryBuffer.length > 0) {
        currentSection.theory = theoryBuffer.join(' ');
      }
      
      return { ...currentSection, id: index };
    });
  };

  const technologies = [
    {
      id: 'python',
      name: 'Python',
      description: 'Programming Language',
      icon: '🐍',
      available: true,
      color: 'from-blue-400 to-blue-600'
    },
    {
      id: 'sql',
      name: 'SQL',
      description: 'Database Management',
      icon: '🗄️',
      available: true,
      color: 'from-orange-400 to-orange-600'
    },
    {
      id: 'html',
      name: 'HTML',
      description: 'Markup Language',
      icon: '🌐',
      available: false,
      color: 'from-red-400 to-red-600'
    },
    {
      id: 'css',
      name: 'CSS',
      description: 'Styling Language',
      icon: '🎨',
      available: false,
      color: 'from-purple-400 to-purple-600'
    },
    {
      id: 'javascript',
      name: 'JavaScript',
      description: 'Programming Language',
      icon: '⚡',
      available: false,
      color: 'from-yellow-400 to-yellow-600'
    },
    {
      id: 'react',
      name: 'React',
      description: 'JavaScript Library',
      icon: '⚛️',
      available: false,
      color: 'from-cyan-400 to-cyan-600'
    }
  ];

  const handleTechnologyClick = (tech) => {
    if (!tech.available) return;
    
    setCurrentView('study');
    switch (tech.id) {
      case 'python':
        setSelectedContent(pythonContent);
        break;
      case 'sql':
        setSelectedContent(sqlContent);
        break;
      default:
        setSelectedContent(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const parsedContent = selectedContent ? parseMarkdownContent(selectedContent.content) : [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-4">
              {currentView === 'study' && (
                <button
                  onClick={() => setCurrentView('home')}
                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  <span>Back to Dashboard</span>
                </button>
              )}
              <h1 className="text-xl font-semibold text-gray-900">
                {currentView === 'study' && selectedContent ? selectedContent.title : 'Learning Dashboard'}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {user?.name}</span>
              <button
                onClick={logout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {error && (
          <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          </div>
        )}

        {/* Home View */}
        {currentView === 'home' && (
          <>
            {/* Welcome Section */}
            {dashboardData && (
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg mb-8 text-white">
                <div className="p-8">
                  <h2 className="text-2xl font-bold mb-2">Welcome to Your Learning Journey! 🚀</h2>
                  <p className="text-blue-100 mb-4">
                    Master programming and database skills with our comprehensive study materials.
                  </p>
                  <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                    <p className="text-sm opacity-90">
                      <span className="font-medium">Email:</span> {dashboardData.user_email} | 
                      <span className="font-medium ml-4">User ID:</span> {dashboardData.user_id}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Technology Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {technologies.map((tech) => (
                <div
                  key={tech.id}
                  onClick={() => handleTechnologyClick(tech)}
                  className={`relative group rounded-xl shadow-lg overflow-hidden transition-all duration-300 transform ${
                    tech.available 
                      ? 'cursor-pointer hover:shadow-2xl hover:scale-105' 
                      : 'cursor-not-allowed'
                  }`}
                >
                  {/* Card Header */}
                  <div className={`h-32 bg-gradient-to-br ${tech.color} flex items-center justify-center relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-300"></div>
                    <span className="text-5xl relative z-10 group-hover:scale-110 transition-transform duration-300">
                      {tech.icon}
                    </span>
                  </div>
                  
                  {/* Card Body */}
                  <div className="bg-white p-6 relative">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{tech.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{tech.description}</p>
                    
                    <div className="flex justify-between items-center">
                      {tech.available ? (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          ✓ Available
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                          🔒 Coming Soon
                        </span>
                      )}
                      
                      {tech.available && (
                        <span className="text-blue-600 text-sm font-medium group-hover:text-blue-800">
                          Start Learning →
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/* Overlay for unavailable */}
                  {!tech.available && (
                    <div className="absolute inset-0 bg-gray-900/20 flex items-center justify-center">
                      <div className="bg-white rounded-lg px-4 py-2 shadow-lg">
                        <span className="text-gray-700 font-medium">Coming Soon</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Stats Section */}
            {dashboardData?.dashboard_data && (
              <div className="mt-12">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Your Progress</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Total Posts</p>
                        <p className="text-2xl font-bold text-gray-900">{dashboardData.dashboard_data.total_posts}</p>
                      </div>
                      <div className="bg-blue-100 rounded-full p-3">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Total Views</p>
                        <p className="text-2xl font-bold text-gray-900">{dashboardData.dashboard_data.total_views}</p>
                      </div>
                      <div className="bg-green-100 rounded-full p-3">
                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Total Likes</p>
                        <p className="text-2xl font-bold text-gray-900">{dashboardData.dashboard_data.total_likes}</p>
                      </div>
                      <div className="bg-purple-100 rounded-full p-3">
                        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* Study View */}
        {currentView === 'study' && selectedContent && (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6">
              <h2 className="text-2xl font-bold mb-2">{selectedContent.title}</h2>
              <p className="text-indigo-100">{selectedContent.description}</p>
            </div>
            
            <div className="p-8">
              <div className="space-y-8">
                {parsedContent.map((section) => (
                  <div key={section.id} className="border-b border-gray-200 pb-8 last:border-b-0">
                    {section.title && (
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">{section.title}</h3>
                    )}
                    
                    {section.theory && (
                      <div className="mb-6">
                        <h4 className="text-lg font-semibold text-gray-800 mb-3">📚 Theory</h4>
                        <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-400">
                          <p className="text-gray-700 leading-relaxed">{section.theory}</p>
                        </div>
                      </div>
                    )}
                    
                    {section.code && (
                      <div className="mb-6">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-lg font-semibold text-gray-800">💻 Code Examples</h4>
                          <button
                            onClick={() => copyToClipboard(section.code)}
                            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm font-medium text-gray-700"
                          >
                            {copiedCode === section.code ? (
                              <>
                                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="text-green-600">Copied!</span>
                              </>
                            ) : (
                              <>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                                <span>Copy Code</span>
                              </>
                            )}
                          </button>
                        </div>
                        <div className="bg-gray-900 rounded-lg overflow-hidden">
                          <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
                            <div className="flex space-x-2">
                              <div className="w-3 h-3 rounded-full bg-red-500"></div>
                              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                              <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            </div>
                            <span className="text-gray-400 text-sm">
                              {selectedContent.title.toLowerCase().includes('python') ? 'Python' : 'Code'}
                            </span>
                          </div>
                          <pre className="p-4 text-sm text-gray-100 overflow-x-auto">
                            <code>{section.code}</code>
                          </pre>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
