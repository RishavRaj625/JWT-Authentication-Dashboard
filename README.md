# Authentication System - Complete Structure

## 📁 **Folder Structure**



```
my-fullstack-app/
├── backend/
│   ├── main.py                 # Main FastAPI app
│   ├── models.py              # Database models
│   ├── auth.py                # Authentication logic
│   ├── dependencies.py        # Auth dependencies
│   ├── requirements.txt       # Python packages
│   ├── users.db              # SQLite database (auto-created)
│   └── venv/                 # Virtual environment
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Register.jsx   # Registration form
│   │   │   ├── Login.jsx      # Login form
│   │   │   ├── Dashboard.jsx  # Protected dashboard
│   │   │   └── Navbar.jsx     # Navigation with logout
│   │   ├── context/
│   │   │   └── AuthContext.jsx # Auth state management
│   │   ├── utils/
│   │   │   └── api.js         # API utility functions
│   │   ├── App.jsx            # Main app with routing
│   │   ├── main.jsx          # React entry point
│   │   └── index.css         # Styles
│   ├── package.json
│   └── vite.config.js
│
└── README.md


# Updated Frontend

frontend/
├── src/
│   ├── components/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Navbar.jsx
│   │   ├── AdminLogin.jsx         
│   │   ├── AdminDashboard.jsx      
│   │   ├── UsersList.jsx           
│   │   ├── UsersActivity.jsx      
│   │   └── AdminStats.jsx         
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── AdminContext.jsx       
│   ├── utils/
│   │   ├── api.js
│   │   └── adminApi.js           
│   ├── App.jsx                    
│   ├── main.jsx
│   └── index.css
```

## 🔐 **Authentication Flow Process**

### **1. User Registration Flow**
```
1. User fills registration form (name, email, password)
2. Frontend sends POST /register
3. Backend creates user account (hashed password)
4. Backend returns JWT token
5. Frontend stores token + redirects to dashboard
```

### **2. User Login Flow**
```
1. User fills login form (email, password)
2. Frontend sends POST /login
3. Backend verifies credentials
4. Backend returns JWT token
5. Frontend stores token + redirects to dashboard
```

### **3. Protected Dashboard Access**
```
1. User tries to access dashboard
2. Frontend checks if token exists
3. Frontend sends token in Authorization header
4. Backend validates JWT token
5. If valid: Show dashboard | If invalid: Redirect to login
```

### **4. Token Management**
```
- Store JWT token in localStorage/sessionStorage
- Include token in all API requests
- Auto-logout when token expires
- Clear token on manual logout
```

## 🗄️ **Database Schema**

### **Users Table:**
```sql
CREATE TABLE users (
    id VARCHAR PRIMARY KEY,
    name VARCHAR NOT NULL,
    email VARCHAR UNIQUE NOT NULL,
    password_hash VARCHAR NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);
```

## 🛡️ **Security Features**

### **Password Security:**
- Passwords hashed with bcrypt
- Never store plain passwords
- Strong password validation

### **JWT Token Security:**
- Signed tokens with secret key
- Token expiration (e.g., 24 hours)
- Include user info in token payload

### **Route Protection:**
- Middleware checks token on protected routes
- Automatic redirect to login if unauthorized
- Token refresh mechanism (optional)

## 📋 **API Endpoints**

### **Authentication Endpoints:**
```
POST /register          # Create new user account
POST /login            # Login existing user
POST /logout           # Logout user (optional)
GET  /me               # Get current user info
```

### **Protected Endpoints:**
```
GET  /dashboard        # Protected dashboard data
GET  /users            # Admin only - list users
PUT  /profile          # Update user profile
```

## 🔄 **Page Navigation Logic**

### **Public Pages (No Auth Required):**
- `/` - Home/Landing page
- `/register` - Registration form
- `/login` - Login form

### **Protected Pages (Auth Required):**
- `/dashboard` - User dashboard
- `/profile` - User profile
- `/admin` - Admin panel (role-based)

### **Navigation Rules:**
```javascript
// If user is authenticated:
- Can access: dashboard, profile
- Redirected from: login, register → dashboard

// If user is NOT authenticated:
- Can access: home, login, register
- Redirected from: dashboard, profile → login
```

## 🚀 **Implementation Steps**

### **Step 1: Backend Setup**
1. Install auth dependencies
2. Create user model with password hashing
3. Implement JWT authentication
4. Create auth middleware
5. Protect dashboard endpoints

### **Step 2: Frontend Setup**
1. Create authentication context
2. Build registration component
3. Build login component
4. Create protected route wrapper
5. Implement token management

### **Step 3: Integration**
1. Connect registration form to API
2. Connect login form to API
3. Store JWT token after auth
4. Add token to API requests
5. Handle auth errors and redirects

## 💡 **Key Components**

### **Backend Key Files:**
- `auth.py` - JWT creation, password hashing
- `dependencies.py` - Auth middleware
- `models.py` - User database model

### **Frontend Key Files:**
- `AuthContext.jsx` - Global auth state
- `ProtectedRoute.jsx` - Route protection
- `api.js` - Token management for requests

## 🎯 **User Experience Flow**

```
New User Journey:
Home → Register → Dashboard (auto-login) → Use App

Existing User Journey:
Home → Login → Dashboard → Use App

Protected Access:
Try Dashboard → Check Token → Valid: Show | Invalid: Redirect to Login
```

This structure provides:
- ✅ Secure user registration
- ✅ User login/logout
- ✅ Protected dashboard access
- ✅ Token-based authentication
- ✅ Automatic redirects
- ✅ Password security
- ✅ Session management
