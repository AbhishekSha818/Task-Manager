# Smart Task Manager - Full Stack Mobile Application

A production-ready task management mobile application built with **Expo React Native** (frontend) and **Node.js/Express** (backend). Features JWT authentication, MongoDB integration, light/dark theme support, and full CRUD functionality.

---

## 📋 Project Structure

```
smart-task-manager/
├── backend/                          # Node.js Express API
│   ├── src/
│   │   ├── config/db.ts             # MongoDB connection
│   │   ├── models/
│   │   │   ├── User.ts              # User schema
│   │   │   └── Task.ts              # Task schema
│   │   ├── middleware/
│   │   │   ├── auth.ts              # JWT verification
│   │   │   └── validation.ts        # Input validation
│   │   ├── routes/
│   │   │   ├── auth.ts              # Auth endpoints
│   │   │   └── tasks.ts             # Task CRUD endpoints
│   │   ├── utils/helpers.ts         # Helper functions
│   │   └── server.ts                # Express app entry
│   ├── .env                         # Environment variables
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/                         # Expo React Native app
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login.tsx            # Login screen
│   │   │   └── register.tsx         # Register screen
│   │   ├── (app)/
│   │   │   ├── home.tsx             # Task list screen
│   │   │   ├── create.tsx           # Create task screen
│   │   │   └── edit/[id].tsx        # Edit task screen
│   │   └── _layout.tsx              # Root navigator
│   ├── components/
│   │   ├── TaskCard.tsx             # Task item component
│   │   ├── ThemeToggle.tsx          # Theme switcher
│   │   └── LoadingSpinner.tsx       # Loading indicator
│   ├── context/
│   │   ├── AuthContext.tsx          # Auth state management
│   │   └── ThemeContext.tsx         # Theme state management
│   ├── services/api.ts              # API client
│   ├── types/index.ts               # TypeScript types
│   ├── constants/config.ts          # App constants
│   ├── package.json
│   └── tsconfig.json
│
└── .gitignore
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js v18+
- pnpm (install globally: `npm install -g pnpm`)
- MongoDB Atlas account (free tier available)
- Expo Go app (for mobile testing)

### Step 1: Setup Backend

```bash
cd backend
pnpm install
```

**Create .env file** (already created, check values):
```env
PORT=5000
MONGODB_URI=mongodb+srv://abhisheksha818_db_user:Abhishek-700182@note-task.deirkea.mongodb.net/?appName=Note-Task
JWT_SECRET=smart_task_manager_jwt_secret_2024
JWT_EXPIRE=7d
NODE_ENV=development
```

**Start Backend Server:**
```bash
pnpm dev
```

The server will run on `http://localhost:5000`. You should see:
```
Server running on port 5000
MongoDB connected successfully
```

### Step 2: Setup Frontend

```bash
cd frontend
pnpm install
```

**Update API URL** (if backend runs on different machine):
- Edit `frontend/constants/config.ts`
- Change `API_BASE_URL` from `http://localhost:5000/api`

**Start Frontend:**
```bash
pnpm start
```

Select your platform:
- Press `i` for iOS simulator
- Press `a` for Android emulator
- Press `w` for web browser
- Scan QR code with Expo Go app (mobile)

---

## 🔑 Features

### ✅ Authentication
- **Register** - Create new account with email/username/password
- **Login** - JWT-based authentication
- **Logout** - Clear session and return to login
- **Session Persistence** - Auto-login on app restart

### ✅ Task Management
- **Create** - Add new tasks with title and description
- **Read** - View all tasks with filtering by status
- **Update** - Edit task title, description, and status
- **Delete** - Remove tasks with confirmation
- **Filter** - View tasks by status (All, Pending, In Progress, Completed)

### ✅ UI/UX
- **Light/Dark Theme** - Toggle button on home screen
- **Responsive Design** - Works on all screen sizes
- **Loading States** - Visual feedback during operations
- **Empty States** - Helpful messages when no tasks exist
- **Error Handling** - User-friendly error messages
- **Clean Interface** - Professional, simple design

### ✅ Security
- **Password Hashing** - Secure password storage
- **JWT Tokens** - Secure API authentication
- **Input Validation** - Frontend and backend validation
- **Error Messages** - No sensitive data exposure

---

## 🔌 API Endpoints

### Authentication
```
POST   /api/auth/register    { email, username, password }
POST   /api/auth/login       { email, password }
```

### Tasks
```
GET    /api/tasks            (Get all tasks, optional: ?status=Pending)
POST   /api/tasks            { title, description?, status? }
GET    /api/tasks/:id        (Get single task)
PUT    /api/tasks/:id        { title, description?, status? }
DELETE /api/tasks/:id        (Delete task)
```

**Response Format:**
```json
{
  "message": "Success message",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "username": "username"
  }
}
```

---

## 📱 Screens & Navigation

### Authentication Flow
1. **Login Screen** - Email & password form with register link
2. **Register Screen** - Create account form with login link

### Task Management Flow
1. **Home Screen** (Task List)
   - Filter tasks by status (All, Pending, In Progress, Completed)
   - View all tasks in list format
   - Theme toggle button (Light/Dark)
   - Logout button
   - Floating action button to create task

2. **Create Task Screen**
   - Enter task title (required)
   - Add description (optional)
   - Submit to create

3. **Edit Task Screen**
   - Modify title and description
   - Change status (Pending → In Progress → Completed)
   - Update and save

---

## 🎨 Design System

### Colors
**Light Theme:**
- Background: `#FFFFFF`
- Card: `#F5F5F5`
- Text: `#000000`
- Primary: `#2563EB` (Blue)
- Success: `#10B981` (Green)
- Warning: `#F59E0B` (Amber)
- Error: `#EF4444` (Red)

**Dark Theme:**
- Background: `#1F2937`
- Card: `#374151`
- Text: `#FFFFFF`
- Primary: `#3B82F6` (Light Blue)
- Success: `#34D399` (Light Green)
- Warning: `#FBBF24` (Light Amber)
- Error: `#F87171` (Light Red)

---

## 🧪 Testing the App

### Test User (Pre-created or create new)
1. **Register New User:**
   - Email: `test@example.com`
   - Username: `testuser`
   - Password: `password123`

2. **Test Flows:**
   - Create a task → Edit it → Change status → Delete it
   - Filter tasks by status
   - Toggle light/dark theme
   - Logout and login again
   - Create multiple tasks and test filtering

---

## 📦 Dependencies

### Backend
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `jsonwebtoken` - JWT authentication
- `express-validator` - Input validation
- `dotenv` - Environment variables
- `cors` - Cross-origin support

### Frontend
- `expo` - React Native framework
- `expo-router` - Navigation
- `axios` - HTTP client
- `react-hook-form` - Form handling
- `@react-native-async-storage/async-storage` - Local storage
- `expo-secure-store` - Secure token storage

---

## 🔧 Environment Configuration

**Backend (.env):**
```env
PORT=5000                              # Server port
MONGODB_URI=mongodb+srv://...          # MongoDB connection string
JWT_SECRET=your_secret_key             # JWT signing key
JWT_EXPIRE=7d                          # Token expiration
NODE_ENV=development                   # Environment
```

**Frontend (constants/config.ts):**
```typescript
API_BASE_URL = 'http://localhost:5000/api'  # Backend API URL
TOKEN_KEY = 'authToken'                      # AsyncStorage key
```

---

## 🛠️ Development Commands

### Backend
```bash
cd backend

# Development (watch mode)
pnpm dev

# Build TypeScript
pnpm build

# Production
pnpm start
```

### Frontend
```bash
cd frontend

# Start development server
pnpm start

# Run on iOS simulator
pnpm ios

# Run on Android emulator
pnpm android

# Run on web
pnpm web

# Lint code
pnpm lint
```

---

## 📝 Code Style & Standards

- **TypeScript** - Full type safety
- **Clean Architecture** - Modular, reusable code
- **Error Handling** - Comprehensive error management
- **Input Validation** - Both frontend and backend
- **Comments** - Only where necessary
- **Naming Conventions** - Clear, descriptive names

---

## 🔐 Security Best Practices

✅ **Implemented:**
- Password hashing with PBKDF2
- JWT token-based authentication
- Secure token storage (AsyncStorage)
- Input validation on both ends
- CORS configuration
- No sensitive data in error messages
- Environment variables for secrets

✅ **Production Ready:**
- Use HTTPS in production
- Change JWT_SECRET
- Enable MongoDB IP whitelist
- Rate limiting (optional)
- Use secure HTTPS URLs

---

## 🐛 Troubleshooting

### Backend Won't Start
```bash
# Check MongoDB connection
# Verify .env file has correct MONGODB_URI

# Clear node_modules and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
pnpm dev
```

### Frontend Can't Connect to Backend
```bash
# Check backend is running on port 5000
# Verify API_BASE_URL in frontend/constants/config.ts
# If using different machine, update to backend IP:
# API_BASE_URL = 'http://192.168.x.x:5000/api'
```

### Login/Register Not Working
```bash
# Check MongoDB connection in backend logs
# Verify JWT_SECRET is set in .env
# Check network tab in browser for API errors
```

---

## 📈 Future Enhancements (Bonus Features)

- [ ] Unit tests with Jest
- [ ] Push notifications
- [ ] Offline sync support
- [ ] Task priorities
- [ ] Due dates with reminders
- [ ] Task categories/tags
- [ ] User profile management
- [ ] Task search functionality
- [ ] Task sharing between users
- [ ] CI/CD pipeline (GitHub Actions)
- [ ] Cloud deployment (Heroku, Firebase)

---

## 📄 License

MIT License - feel free to use this project

---

## 👤 Author

Smart Task Manager Development Team

---

## 📞 Support

For issues or questions:
1. Check troubleshooting section
2. Review code comments
3. Check git commit history for changes

---

**Happy Coding! 🎉**
