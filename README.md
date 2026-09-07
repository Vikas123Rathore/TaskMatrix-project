
# 🚀 TaskMatrix

TaskMatrix is a full-stack Agile Project Management Platform designed to help software teams manage projects, tasks, workflows, and team collaboration from a centralized workspace.

This project is being developed as part of my **Software Engineering Internship at Prodesk IT**.

---

## 📌 Sprint 14 – The Walking Skeleton

Sprint 14 focused on building the initial working foundation of TaskMatrix.

The primary objective of this sprint was to establish a functional full-stack application with a secure authentication system, protected routes, frontend-backend integration, and production deployment.

The authentication flow was implemented and tested from registration through login, protected dashboard access, session persistence, and logout.

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

### 🎨 Frontend

- React.js with Vite
- React Router DOM
- Tailwind CSS
- Responsive UI
- Login page
- Registration page
- Protected Dashboard
- Authentication state management
- Axios API integration
- Client-side route protection
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
                         │       User           │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │ React + Vite         │
                         │ Frontend             │
                         │ Vercel               │
                         └──────────┬───────────┘
                                    │
                              Axios API
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │ Node.js + Express    │
                         │ Backend              │
                         │ Render               │
                         └──────────┬───────────┘
                                    │
                       ┌────────────┴────────────┐
                       │                         │
                       ▼                         ▼
                ┌──────────────┐        ┌────────────────┐
                │ JWT + Cookie │        │ MongoDB Atlas  │
                │ Authentication│        │ Database       │
                └──────────────┘        └────────────────┘
````

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
│   │   └── userController.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   └── userModel.js
│   │
│   ├── routes/
│   │   ├── userRoute.js
│   │   └── taskRoute.js
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
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Daskboard.jsx
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

# 🔒 Security

The application implements the following security practices:

* Passwords are hashed using bcrypt before storing them in MongoDB.
* JWT is stored using an HttpOnly cookie.
* Authentication middleware verifies JWT tokens.
* Protected routes require valid authentication.
* Passwords are never returned from the current-user API.
* CORS is configured with credentials support.
* Environment variables are used for sensitive configuration.
* `.env` files are excluded from Git.
* `.env.example` files are provided as configuration references.
* Production cookies use secure HTTPS configuration.

---

# 🔗 API Endpoints

## Register

```http
POST /api/auth/register
```

Creates a new user account.

### Request

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

---

## Login

```http
POST /api/auth/login
```

Authenticates the user and creates the JWT authentication cookie.

### Request

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

---

## Logout

```http
POST /api/auth/logout
```

Clears the authentication cookie and logs the user out.

---

## Current User

```http
GET /api/auth/current-user
```

Protected endpoint that returns the currently authenticated user.

### Response

```json
{
  "success": true,
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

---

## Protected Tasks Route

```http
GET /api/tasks
```

Protected route used to verify authentication middleware.

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

For production, configure the environment variables through the hosting platform.

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

Create the `.env` file:

```env
PORT=8080
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

Start the backend:

```bash
npm run dev
```

Backend will run on:

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

Create:

```text
.env
```

Add:

```env
VITE_API_URL=http://localhost:8080/api
```

Start the frontend:

```bash
npm run dev
```

Frontend will run on:

```text
http://localhost:5173
```

---

# 🌐 Live Demo

### Frontend

👉 [https://task-matrix-project.vercel.app](https://task-matrix-project.vercel.app)

### Dashboard

👉 [https://task-matrix-project.vercel.app/dashboard](https://task-matrix-project.vercel.app/dashboard)

### Backend API

👉 [https://taskmatrix-project.onrender.com](https://taskmatrix-project.onrender.com)

---

# 📂 GitHub Repository

👉 [https://github.com/Vikas123Rathore/TaskMatrix-project](https://github.com/Vikas123Rathore/TaskMatrix-project)

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

# 🧪 Authentication Testing

The following authentication scenarios were tested:

| Test Case                   | Status |
| --------------------------- | ------ |
| User Registration           | ✅      |
| User Login                  | ✅      |
| Invalid Login               | ✅      |
| JWT Authentication          | ✅      |
| Protected Dashboard         | ✅      |
| Current User                | ✅      |
| Page Refresh Authentication | ✅      |
| User Logout                 | ✅      |
| Protected API Route         | ✅      |
| Production Deployment       | ✅      |

---

# 📈 Sprint 14 Outcome

By completing Sprint 14, TaskMatrix achieved a functional full-stack foundation.

The sprint successfully delivered:

* Complete user authentication
* Secure password hashing
* JWT authentication
* HttpOnly cookie authentication
* Authentication middleware
* Protected API routes
* Protected frontend routes
* Global authentication state
* Frontend-backend integration
* Environment-based configuration
* Production deployment
* Vercel SPA routing
* Basic dashboard foundation

This authentication foundation will support the development of additional TaskMatrix features in future sprints.

---

# 🔮 Future Scope

Future development of TaskMatrix can include:

* Project Management
* Task Management
* Kanban Board
* Team Management
* Role-Based Access Control
* Notifications
* Dashboard Analytics
* Real-Time Updates using Socket.io
* AI-powered Task Assistant
* Activity Tracking

---

# 🎓 Internship

This project is being developed as part of my **Software Engineering Internship at Prodesk IT**.

Sprint 14 helped strengthen practical knowledge of:

* Full-Stack Development
* React.js
* Node.js
* Express.js
* MongoDB
* REST APIs
* JWT Authentication
* Secure Cookies
* React Context API
* Protected Routing
* Git & GitHub
* Deployment
* Production Environment Configuration
* Debugging and Testing

---

# 👨‍💻 Developer

**Vikas Rathore**

Software Engineering Intern
Prodesk IT

### Project

**TaskMatrix – Agile Project Management Platform**

### GitHub

[https://github.com/Vikas123Rathore/TaskMatrix-project](https://github.com/Vikas123Rathore/TaskMatrix-project)

### Live Demo

[https://task-matrix-project.vercel.app](https://task-matrix-project.vercel.app)

````

### GitHub me add karne ke baad

Root folder me ye structure hona chahiye:

```text
TaskMatrix-project/
│
├── backend/
├── frontend/
├── .gitignore
├── README.md       ✅
└── Prompts.md      ✅
````

