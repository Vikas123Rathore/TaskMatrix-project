# 🚀 TaskMatrix

TaskMatrix is a full-stack Agile Project Management Platform designed to help software teams manage projects, tasks, workflows, and team collaboration from a centralized workspace.

This project is being developed as part of my **Software Engineering Internship at Prodesk IT**.

---

## 📌 Sprint 14 – The Walking Skeleton

Sprint 14 focused on building the initial working foundation of TaskMatrix.

The primary objective was to establish a functional full-stack application with secure authentication, protected routes, frontend-backend integration, and production deployment.

### Sprint 14 Highlights

- User registration and login
- JWT-based authentication
- HttpOnly cookie-based token storage
- Password hashing using bcrypt
- Authentication middleware
- Protected API routes
- Current authenticated user API
- Persistent authentication after page refresh
- React Context API for authentication state
- Protected frontend routes
- Vercel frontend deployment
- Render backend deployment
- MongoDB Atlas database

---

## ✨ Features

### 🔐 Authentication

- User Registration
- User Login
- User Logout
- JWT-based authentication
- HttpOnly cookie-based token storage
- Password hashing using bcrypt
- Authentication middleware
- Protected API routes
- Current authenticated user API
- Persistent authentication after page refresh
- Authentication state management using React Context API
- Protected Dashboard
- Authentication-based route protection

### 📁 Project Management

- Create Project
- View all Projects
- View Project Details
- Update Project
- Delete Project
- Project status management
- Project ownership using authenticated user
- Project-specific task management

### ✅ Task Management

- Create Task
- View all Tasks
- View Project Tasks
- View Task Details
- Update Task
- Delete Task
- Task priority management
- Task status management
- Due date support
- Tasks linked to Projects
- User-specific task access

### 🔔 Notifications

- Success toast notifications
- Error toast notifications
- Authentication action notifications
- Project operation notifications
- Task operation notifications

### 📊 Dashboard

- Project count
- Task count
- Completed task count
- In Progress task count
- Recent Tasks
- My Projects
- Project progress display
- Quick Overview cards

### 🎨 Frontend

- React.js with Vite
- React Router DOM
- Tailwind CSS
- Responsive UI
- Login page
- Registration page
- Protected Dashboard
- Project pages
- Task pages
- Axios API integration
- Context API state management
- Client-side route protection
- Toast notifications using react-hot-toast
- Vercel SPA routing configuration

### ⚙️ Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Cookie Parser
- CORS
- dotenv
- REST API architecture
- Protected middleware
- User-specific Project and Task authorization

---

## 🛠️ Tech Stack

### Frontend

- React.js
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- Lucide React
- Context API
- React Hot Toast

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- cookie-parser
- cors
- dotenv

### Tools & Deployment

- Git
- GitHub
- Vercel
- Render
- MongoDB Atlas

---

## 🏗️ Project Architecture

```text
                         ┌──────────────────────┐
                         │        User          │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │   React + Vite       │
                         │      Frontend        │
                         │       Vercel         │
                         └──────────┬───────────┘
                                    │
                               Axios API
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │ Node.js + Express     │
                         │      Backend          │
                         │       Render          │
                         └──────────┬───────────┘
                                    │
                    ┌───────────────┴───────────────┐
                    │                               │
                    ▼                               ▼
             ┌──────────────┐              ┌────────────────┐
             │ JWT + Cookie │              │ MongoDB Atlas  │
             │ Authentication│              │    Database    │
             └──────────────┘              └────────────────┘
```

---

## 📁 Project Structure

```text
TaskMatrix-project/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── userController.js
│   │   ├── projectController.js
│   │   └── taskController.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   ├── userModel.js
│   │   ├── projectModel.js
│   │   └── taskModel.js
│   │
│   ├── routes/
│   │   ├── userRoute.js
│   │   ├── projectRouter.js
│   │   └── taskRouter.js
│   │
│   ├── utils/
│   │   └── token.js
│   │
│   ├── .env.example
│   ├── index.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js
│   │   │
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── ProjectCard.jsx
│   │   │   └── TaskCard.jsx
│   │   │
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   ├── ProjectContext.jsx
│   │   │   └── TaskContext.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Daskboard.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── CreateProject.jsx
│   │   │   ├── ProjectDetails.jsx
│   │   │   ├── EditProject.jsx
│   │   │   ├── Tasks.jsx
│   │   │   ├── CreateTask.jsx
│   │   │   ├── TaskDetails.jsx
│   │   │   └── EditTask.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── .env.example
│   ├── vercel.json
│   ├── vite.config.js
│   └── package.json
│
├── .gitignore
├── README.md
└── Prompts.md
```

---

# 🔐 Authentication Flow

TaskMatrix uses JWT-based authentication with HttpOnly cookies.

```text
User
 │
 ▼
Register
 │
 ▼
Account Created
 │
 ▼
Login
 │
 ▼
Backend validates credentials
 │
 ▼
Password verified using bcrypt
 │
 ▼
JWT generated
 │
 ▼
JWT stored in HttpOnly Cookie
 │
 ▼
Protected Dashboard
 │
 ▼
Current User verification
 │
 ▼
Logout
 │
 ▼
Cookie cleared
 │
 ▼
Login Page
```

---

# 📁 Project & Task Relationship

A **Project** represents a larger piece of work, while a **Task** represents an actionable item inside that project.

```text
Project
   │
   ├── Task 1
   ├── Task 2
   └── Task 3
```

Each Task is linked to its Project using the Project MongoDB ObjectId.

### Project Fields

- `projectName`
- `description`
- `status`
- `authorId`
- `createdAt`
- `updatedAt`

### Task Fields

- `title`
- `description`
- `project`
- `priority`
- `status`
- `dueDate`
- `authorId`
- `createdAt`
- `updatedAt`

---

# 🔒 Security

The application implements the following security practices:

- Passwords are hashed using bcrypt before storing them in MongoDB.
- JWT is stored using an HttpOnly cookie.
- Authentication middleware verifies JWT tokens.
- Protected routes require valid authentication.
- Project and Task operations are restricted to the authenticated user.
- Passwords are never returned from the current-user API.
- CORS is configured with credentials support.
- Environment variables are used for sensitive configuration.
- `.env` files are excluded from Git.
- `.env.example` files are provided as configuration references.
- Production cookies use secure HTTPS configuration.

---

# 🔗 API Endpoints

## Authentication

### Register

```http
POST /api/auth/register
```

Creates a new user account.

### Login

```http
POST /api/auth/login
```

Authenticates the user and creates the JWT authentication cookie.

### Logout

```http
POST /api/auth/logout
```

Clears the authentication cookie and logs the user out.

### Current User

```http
GET /api/auth/current-user
```

Returns the currently authenticated user.

---

## Projects

### Create Project

```http
POST /api/projects/create
```

Creates a new project for the authenticated user.

### Get Projects

```http
GET /api/projects
```

Returns projects belonging to the authenticated user.

### Get Project

```http
GET /api/projects/:id
```

Returns a single project owned by the authenticated user.

### Update Project

```http
PUT /api/projects/:id
```

Updates an existing project.

### Delete Project

```http
DELETE /api/projects/:id
```

Deletes an existing project.

---

## Tasks

### Create Task

```http
POST /api/tasks
```

Creates a task and links it to a project.

### Get Tasks

```http
GET /api/tasks
```

Returns tasks belonging to the authenticated user.

### Get Project Tasks

```http
GET /api/tasks/project/:projectId
```

Returns all tasks belonging to a specific project.

### Get Task

```http
GET /api/tasks/:id
```

Returns a single task.

### Update Task

```http
PUT /api/tasks/:id
```

Updates an existing task.

### Delete Task

```http
DELETE /api/tasks/:id
```

Deletes an existing task.

---

# ⚙️ Environment Variables

## Backend

Create:

```text
backend/.env
```

Example:

```env
PORT=8080
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

For production, configure environment variables through the hosting platform.

---

## Frontend

Create:

```text
frontend/.env
```

Example:

```env
VITE_API_URL=http://localhost:8080/api
```

For production:

```env
VITE_API_URL=https://taskmatrix-project.onrender.com/api
```

---

# 💻 Local Installation

## 1. Clone Repository

```bash
git clone https://github.com/Vikas123Rathore/TaskMatrix-project.git
```

Move into the project:

```bash
cd TaskMatrix-project
```

---

# Backend Setup

```bash
cd backend
npm install
```

Create the `.env` file and add the required environment variables.

Start the backend:

```bash
npm run dev
```

Backend:

```text
http://localhost:8080
```

---

# Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
```

Create the `.env` file:

```env
VITE_API_URL=http://localhost:8080/api
```

Start the frontend:

```bash
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

# 🧪 Sprint 15 – Feature Complete

Sprint 15 focused on implementing the core project and task management functionality of TaskMatrix.

### Sprint 15 Deliverables

- Project CRUD
- Task CRUD
- Project Details page
- Project-specific task listing
- Task Details page
- Task editing
- Task deletion
- Project editing
- Project deletion
- Task priority
- Task status
- Task due dates
- Project status
- Dashboard project statistics
- Dashboard task statistics
- Recent Tasks section
- My Projects section
- Toast notifications
- Protected Project APIs
- Protected Task APIs
- User-specific data access
- Project → Task relationship

### Sprint 15 Demo Flow

```text
Login
  ↓
Dashboard
  ↓
Create Project
  ↓
View Project
  ↓
Create Task
  ↓
View Task
  ↓
Edit Task
  ↓
Update Status / Priority
  ↓
Dashboard Statistics
  ↓
Delete Task
  ↓
Edit / Delete Project
  ↓
Logout
```

---

# 🧪 Testing Checklist

| Test Case | Status |
|---|---|
| User Registration | ✅ |
| User Login | ✅ |
| Invalid Login | ✅ |
| JWT Authentication | ✅ |
| Protected Dashboard | ✅ |
| Current User | ✅ |
| Page Refresh Authentication | ✅ |
| User Logout | ✅ |
| Project Create | ✅ |
| Project Read | ✅ |
| Project Update | ✅ |
| Project Delete | ✅ |
| Task Create | ✅ |
| Task Read | ✅ |
| Task Update | ✅ |
| Task Delete | ✅ |
| Project-specific Tasks | ✅ |
| Dashboard Statistics | ✅ |
| Toast Notifications | ✅ |
| Protected API Routes | ✅ |
| Production Deployment | ✅ |

---

# 📈 Sprint 15 Outcome

By completing Sprint 15, TaskMatrix progressed from an authentication foundation into a functional project management application.

The sprint delivered:

- Complete Project CRUD
- Complete Task CRUD
- Project and Task relationship
- Project-specific task management
- Task priority and status management
- Due date support
- Dashboard statistics
- Authentication-protected data
- User-specific authorization
- Toast notifications
- Improved application workflow

The core application is now ready for the next phase of development.

---

# 🔮 Future Scope

Future development of TaskMatrix can include:

- Notifications
- Dashboard Analytics
- Real-Time Updates using Socket.io
- AI-powered Task Assistant
- AI Task Suggestions
- Activity Tracking
- Advanced Search and Filtering
- Improved UI/UX Polish

---

# 🚀 Upcoming Sprint

## Sprint 16 – The AI Injection & Polish

The next major development phase will focus on:

- AI-powered task assistance
- AI-generated task suggestions
- Real-time updates using Socket.io
- UI/UX improvements
- Dashboard polish
- Better user experience
- Final feature improvements

---

# 🌐 Live Demo

### Frontend

https://task-matrix-project.vercel.app

### Dashboard

https://task-matrix-project.vercel.app/dashboard

### Backend API

https://taskmatrix-project.onrender.com

---

# 📂 GitHub Repository

https://github.com/Vikas123Rathore/TaskMatrix-project

---

# 🚀 Deployment

TaskMatrix is deployed using the following architecture:

```text
Frontend
   │
   ▼
Vercel
   │
   ▼
React + Vite
   │
   │ HTTPS API Requests
   ▼
Render
   │
   ▼
Node.js + Express
   │
   ▼
MongoDB Atlas
```

### Frontend Deployment

The React/Vite frontend is deployed on **Vercel**.

### Backend Deployment

The Node.js/Express backend is deployed on **Render**.

### Database

MongoDB Atlas is used as the cloud database.

---

# 🎓 Internship

This project is being developed as part of my **Software Engineering Internship at Prodesk IT**.

Through TaskMatrix, I have strengthened practical knowledge of:

- Full-Stack Development
- React.js
- Node.js
- Express.js
- MongoDB
- Mongoose
- REST APIs
- JWT Authentication
- Secure Cookies
- React Context API
- Protected Routing
- CRUD Operations
- API Integration
- Git & GitHub
- Deployment
- Production Environment Configuration
- Debugging and Testing

---

# 👨‍💻 Developer

**Vikas Rathore**

Software Engineering Intern
Prodesk IT

### Project

**TaskMatrix – Agile Project Management Platform**

### GitHub

https://github.com/Vikas123Rathore/TaskMatrix-project

### Live Demo

https://task-matrix-project.vercel.app
